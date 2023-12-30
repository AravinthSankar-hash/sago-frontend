/* API Request Wrapper */

import axios from 'axios'
import { BASE_ROUTE, BASE_URL } from './api.const';

const client = axios.create({
    baseURL: `${BASE_URL}${BASE_ROUTE}`
});

const request = function (options) {
    const onSuccess = function (response) {
        console.debug('Request Successful!', response);
        return response.data;
    }

    const onError = function (error) {
        console.error('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }
    return client(options)
        .then(onSuccess)
        .catch(onError);
}

export default request;
