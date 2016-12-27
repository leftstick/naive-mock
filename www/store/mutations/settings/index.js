
export function UPDATE_SETTINGS(state, payload) {
    state.settings.data = payload;
}
UPDATE_SETTINGS.type = 'UPDATE_SETTINGS';

export function UPDATE_SETTINGS_OPERATING(state, payload) {
    state.settings.operating = payload;
}
UPDATE_SETTINGS_OPERATING.type = 'UPDATE_SETTINGS_OPERATING';
