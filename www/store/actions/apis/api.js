import axios from 'axios';

import {UPDATE_APIS_QUERY, UPDATE_APIS_OPERATING, UPDATE_API_LIST} from '../../mutations';

import {pickNotEmpty, isString} from 'fw/util/Object';

export function updateAPIsQuery({commit, state}, payload) {
    commit(UPDATE_APIS_QUERY.type, payload);
}

export function resetAPIsQuery({commit, state}, payload) {
    commit(UPDATE_APIS_QUERY.type, {
        api: '',
        category: '',
        status: ''
    });
}

export function getAPI({commit, state}, id) {
    commit(UPDATE_APIS_OPERATING.type, true);

    return axios
        .get(`/internal-used/api/${id}`)
        .then(response => {
            commit(UPDATE_APIS_OPERATING.type, false);
            return response.data.data;
        }, err => {
            commit(UPDATE_APIS_OPERATING.type, false);
            throw err;
        });
}

export function deleteAPI({commit, state}, id) {
    commit(UPDATE_APIS_OPERATING.type, true);

    return axios
        .delete(`/internal-used/api/${id}`)
        .then(response => {
            commit(UPDATE_APIS_OPERATING.type, false);
            commit(UPDATE_API_LIST.type, state.apis.data.list.filter(a => a.id !== id));
            return response.data.data;
        }, err => {
            commit(UPDATE_APIS_OPERATING.type, false);
            throw err;
        });
}


export function fetchAPIs({commit, state}) {
    commit(UPDATE_APIS_OPERATING.type, true);

    return axios
        .get('/internal-used/apis', {
            params: pickNotEmpty(state.apis.query)
        })
        .then(response => {
            commit(UPDATE_APIS_OPERATING.type, false);
            commit(UPDATE_API_LIST.type, response.data.data);
            return response.data.data;
        }, err => {
            commit(UPDATE_APIS_OPERATING.type, false);
            throw err;
        });
}

export function createAPI({commit, state}, api) {
    try {
        valideAPI(api);
    } catch (error) {
        return Promise.reject(error);
    }

    commit(UPDATE_APIS_OPERATING.type, true);

    return axios
        .post('/internal-used/api', api)
        .then(response => {
            commit(UPDATE_APIS_OPERATING.type, false);
            commit(UPDATE_API_LIST.type, [response.data.data, ...state.apis.data.list]);
            return response.data.data;
        }, err => {
            commit(UPDATE_APIS_OPERATING.type, false);
            throw err;
        });
}

export function updateAPI({commit, state}, api) {
    try {
        if (!api.id) {
            throw new Error('id cannot be empty');
        }
        valideAPI(api);
    } catch (error) {
        return Promise.reject(error);
    }

    commit(UPDATE_APIS_OPERATING.type, true);

    return axios
        .put(`/internal-used/api/${api.id}`, api)
        .then(response => {
            commit(UPDATE_APIS_OPERATING.type, false);
            commit(UPDATE_API_LIST.type, state.apis.data.list.map(a => a.id !== api.id ? a : response.data.data));
            return response.data.data;
        }, err => {
            commit(UPDATE_APIS_OPERATING.type, false);
            throw err;
        });
}


function valideAPI(api) {
    if (!api.api) {
        throw new Error('api cannot be empty');
    }
    if (!api.api.startsWith('/')) {
        throw new Error('api must starts with /');
    }
    if (!api.category) {
        throw new Error('category cannot be empty');
    }
    if (!api.method) {
        throw new Error('method cannot be empty');
    }
    if (!api.status) {
        throw new Error('status cannot be empty');
    }
    if (!api.response) {
        throw new Error('response cannot be empty');
    }
    if (!isString(api.response)) {
        return;
    }
    try {
        api.response = api.response.replace(/\n/g, '').replace(/\t/g, '');
        api.response = JSON.parse(api.response);
    } catch (error) {
        throw new Error('response is not a valid JSON');
    }
}
