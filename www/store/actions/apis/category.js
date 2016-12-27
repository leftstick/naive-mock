import axios from 'axios';

import {UPDATE_CATEGORIES_OPERATING, UPDATE_CATEGORY_LIST} from '../../mutations';

export function fetchCategories({commit, state}) {
    commit(UPDATE_CATEGORIES_OPERATING.type, true);

    return axios
        .get('/internal-used/categories')
        .then(function(response) {
            commit(UPDATE_CATEGORIES_OPERATING.type, false);
            commit(UPDATE_CATEGORY_LIST.type, response.data.data);
            return response.data.data;
        }, function(err) {
            commit(UPDATE_CATEGORIES_OPERATING.type, false);
            throw err;
        });
}

export function createCategory({commit, state}, name) {

    if (state.apis.categories.list.some(c => c === name)) {
        throw new Error(`Category [${name}] has be defined`);
    }

    return axios
        .post('/internal-used/category', {
            name
        })
        .then(function(response) {
            commit(UPDATE_CATEGORY_LIST.type, [name, ...state.apis.categories.list]);
            return response.data.data;
        });
}
