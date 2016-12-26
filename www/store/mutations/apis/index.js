
export function UPDATE_APIS_QUERY(state, payload) {
    Object.keys(payload).forEach(k => {
        state.apis.query[k] = payload[k];
    });
}

export function UPDATE_CATEGORIES_OPERATING(state, payload) {
    state.apis.categories.operating = payload;
}

export function UPDATE_CATEGORY_LIST(state, payload) {
    state.apis.categories.list = payload;
}

export function UPDATE_STATUSES_OPERATING(state, payload) {
    state.apis.statuses.operating = payload;
}

export function UPDATE_STATUS_LIST(state, payload) {
    state.apis.statuses.list = payload;
}

export function UPDATE_APIS_OPERATING(state, payload) {
    state.apis.data.operating = payload;
}

export function UPDATE_API_LIST(state, payload) {
    state.apis.data.list = payload;
}
