import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.status === 404) {
        return error;
    } else return Promise.reject(error);
});

const SERVER_URL = 'http://localhost:3001';

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

    static async getAwaitMethod(action: Function, path: string, errorAction: Function) {
        await axios
            .get(API.buildURL(path))
            .then(async (res) => {
                await action(res.data);
            })
            .catch((err) => {
                errorAction(err);
            });
    }

    static postMethod(action: Function, path: string, data: any, errorAction: Function) {
        axios
            .post(API.buildURL(path), data)
            .then((res) => {
                action(res.data);
            })
            .catch((err) => {
                errorAction(err);
            });
    }

    static putMethod(action: Function, path: string, data: any, errorAction: Function) {
        axios
            .put(API.buildURL(path), data)
            .then((res) => {
                action(res.data);
            })
            .catch((err) => {
                errorAction(err);
            });
    }

    static deleteMethod(path: string, errorAction: Function) {
        axios
            .delete(API.buildURL(path))
            .catch((err) => {
                errorAction(err);
            });
    }
}
