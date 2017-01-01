import axios from 'axios';

import {UPDATE_APIS_QUERY, UPDATE_APIS_OPERATING, UPDATE_API_LIST} from '../../mutations';

import {pickNotEmpty} from 'fw/util/Object';

export function updateAPIsQuery({commit, state}, payload) {
    commit(UPDATE_APIS_QUERY.type, payload);
}

export function resetAPIsQuery({commit, state}, payload) {
    commit(UPDATE_APIS_QUERY.type, {
        api: '',
        test_category: '',
        status: ''
    });
}

export function getAPI({commit, state}, _id) {
    commit(UPDATE_APIS_OPERATING.type, true);

    return axios
        .get(`/internal-used/api/${_id}`)
        .then(response => {
            commit(UPDATE_APIS_OPERATING.type, false);
            return response.data.data;
        }, err => {
            commit(UPDATE_APIS_OPERATING.type, false);
            throw err;
        });
}

export function deleteAPI({commit, state}, _id) {
    commit(UPDATE_APIS_OPERATING.type, true);

    return axios
        .delete(`/internal-used/api/${_id}`)
        .then(response => {
            commit(UPDATE_APIS_OPERATING.type, false);
            commit(UPDATE_API_LIST.type, state.apis.data.list.filter(a => a._id !== _id));
            return response.data.data;
        }, err => {
            commit(UPDATE_APIS_OPERATING.type, false);
            throw err;
        });
}

export function deleteAPIs({commit, state}, _ids) {
    commit(UPDATE_APIS_OPERATING.type, true);

    return axios
        .delete('/internal-used/apis', {
            data: _ids
        })
        .then(response => {
            commit(UPDATE_APIS_OPERATING.type, false);
            commit(UPDATE_API_LIST.type, state.apis.data.list.filter(a => !response.data.data.includes(a._id)));
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
        if (!api._id) {
            throw new Error('id cannot be empty');
        }
        valideAPI(api);
    } catch (error) {
        return Promise.reject(error);
    }

    commit(UPDATE_APIS_OPERATING.type, true);

    return axios
        .put(`/internal-used/api/${api._id}`, api)
        .then(response => {
            commit(UPDATE_APIS_OPERATING.type, false);
            commit(UPDATE_API_LIST.type, state.apis.data.list.map(a => a._id !== api._id ? a : response.data.data));
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
    if (!api.test_category) {
        throw new Error('test category cannot be empty');
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
}
