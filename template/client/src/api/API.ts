import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.status === 404) {
        return error;
    } else return Promise.reject(error);
});

const SERVER_URL = ''; // TODO

export default class API {
    url: String;

    constructor() {
        this.url = SERVER_URL
    }

    buildURL(path: String) {
        return `${this.url}/${path}`
    }

    // Add methods here!
}
