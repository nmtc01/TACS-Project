import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.status === 404) {
        return error;
    } else return Promise.reject(error);
});

const SERVER_URL = 'http://localhost:3001'; // TODO

export default class API {
    static url: String;

    static buildURL(path: String) {
        return `${SERVER_URL}/${path}`
    }

    // Add methods here!
    static getMethod(action: Function, path: string, errorAction: Function) {
        axios
            .get(API.buildURL(path))
            .then((res) => {
                action(res.data);
            })
            .catch((err) => {
                errorAction(err);
            });
    }
}
