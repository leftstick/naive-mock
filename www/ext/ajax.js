import axios from 'axios';
import {isString} from 'fw/util/Object';

export default function() {

    axios.interceptors.response.use(function(response) {
        return response;
    }, function({response}) {
        const error = response.data.error;
        let msg = (error && error.message) || response.data;
        if (msg.indexOf(' = ') > -1) {
            msg = msg.substring(msg.indexOf(' = ') + 3);
        }
        if (isString(response.data)) {
            response.data = {};
        }
        response.data.error = {
            name: (error && error.name) || response.statusText,
            message: msg
        };
        return Promise.reject(response.data.error);
    });

    return {};
}
