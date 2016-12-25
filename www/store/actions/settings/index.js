import axios from 'axios';

import {FETCH_SETTINGS} from '../../mutations';

export function fetchSettings({commit, state}) {
    return axios.get('/api/settings')
        .then(function(response) {
            commit(FETCH_SETTINGS.name, response.data.data);
            return response.data.data;
        });
}
