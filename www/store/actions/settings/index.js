import axios from 'axios';

import {UPDATE_SETTINGS, UPDATE_SETTINGS_OPERATING} from '../../mutations';

import {isURL} from 'fw/util/URL';

export function fetchSettings({commit, state}) {
    commit(UPDATE_SETTINGS_OPERATING.name, true);

    return axios.get('/internal-used/settings')
        .then(function(response) {
            commit(UPDATE_SETTINGS_OPERATING.name, false);
            commit(UPDATE_SETTINGS.name, response.data.data);
            return response.data.data;
        }, err => {
            commit(UPDATE_SETTINGS_OPERATING.name, false);
            throw err;
        });
}

export function updateSettings({commit, state}, info) {

    try {
        validate(info);
    } catch (error) {
        return Promise.reject(error);
    }
    commit(UPDATE_SETTINGS_OPERATING.name, true);
    return axios.put('/internal-used/settings', info)
        .then(function(response) {
            commit(UPDATE_SETTINGS_OPERATING.name, false);
            commit(UPDATE_SETTINGS.name, response.data.data);
            return response.data.data;
        }, err => {
            commit(UPDATE_SETTINGS_OPERATING.name, false);
            throw err;
        });
}

function validate(info) {
    if (info.fallback && !isURL(info.fallback)) {
        throw new Error('fallback must be a valid URL');
    }
}
