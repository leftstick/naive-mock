import axios from 'axios';

import {UPDATE_STATUSES_OPERATING, UPDATE_STATUS_LIST} from '../../mutations';

export function fetchStatuses({commit, state}) {
    commit(UPDATE_STATUSES_OPERATING.name, true);

    return axios
        .get('/internal-used/statuses')
        .then(function(response) {
            commit(UPDATE_STATUSES_OPERATING.name, false);
            commit(UPDATE_STATUS_LIST.name, response.data.data);
            return response.data.data;
        }, function(err) {
            commit(UPDATE_STATUSES_OPERATING.name, false);
            throw err;
        });
}


export function createStatus({commit, state}, code) {

    if (state.apis.statuses.list.some(c => c === code)) {
        throw new Error(`Status [${code}] has be defined`);
    }

    return axios
        .post('/internal-used/status', {
            code
        })
        .then(function(response) {
            commit(UPDATE_STATUS_LIST.name, [code, ...state.apis.statuses.list]);
            return response.data.data;
        });
}
