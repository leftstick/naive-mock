
export function UPDATE_APIS_QUERY(state, payload) {
    Object.keys(payload).forEach(k => {
        state.apis.query[k] = payload[k];
    });
}
UPDATE_APIS_QUERY.type = 'UPDATE_APIS_QUERY';

export function UPDATE_CATEGORIES_OPERATING(state, payload) {
    state.apis.categories.operating = payload;
}
UPDATE_CATEGORIES_OPERATING.type = 'UPDATE_CATEGORIES_OPERATING';

export function UPDATE_CATEGORY_LIST(state, payload) {
    state.apis.categories.list = payload;
}
UPDATE_CATEGORY_LIST.type = 'UPDATE_CATEGORY_LIST';

export function UPDATE_STATUSES_OPERATING(state, payload) {
    state.apis.statuses.operating = payload;
}
UPDATE_STATUSES_OPERATING.type = 'UPDATE_STATUSES_OPERATING';

export function UPDATE_STATUS_LIST(state, payload) {
    state.apis.statuses.list = payload;
}
UPDATE_STATUS_LIST.type = 'UPDATE_STATUS_LIST';

export function UPDATE_APIS_OPERATING(state, payload) {
    state.apis.data.operating = payload;
}
UPDATE_APIS_OPERATING.type = 'UPDATE_APIS_OPERATING';

export function UPDATE_API_LIST(state, payload) {
    state.apis.data.list = payload;
}
UPDATE_API_LIST.type = 'UPDATE_API_LIST';
