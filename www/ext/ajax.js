import axios from 'axios';

export default function() {


    axios.interceptors.response.use(function(response) {
        return response;
    }, function({response}) {
        if (!response.data.error) {
            return response;
        }
        const error = response.data.error;
        let msg = error.message || response.body;
        if (msg.indexOf(' = ') > -1) {
            msg = msg.substring(msg.indexOf(' = ') + 3);
        }
        response.data.error = {
            name: error.name,
            message: msg
        };
        return Promise.reject(response.data.error);
    });

    return {};
}
