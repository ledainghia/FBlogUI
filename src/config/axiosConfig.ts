import axios from 'axios';
import jwt from 'jwt-decode';



interface user {
    user: string,
    exp: number,
}

const BASE_URL = 'https://api.fublog.tech';

export default function axiosConfig() {


    axios.defaults.baseURL = BASE_URL;
    axios.interceptors.request.use(function (config) {
        if (!localStorage.getItem('token') && !sessionStorage.getItem('token')) {
            axios.defaults.baseURL = BASE_URL;
            return config;
        }
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            if (token) {

                const exp: user = jwt(token);
                if (exp.exp < Date.now() / 1000) {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        const expRefreshToken: user = jwt(refreshToken);
                        if (expRefreshToken.exp < Date.now() / 1000) {
                            localStorage.clear();
                            axios.defaults.baseURL = BASE_URL;

                            return config;
                        } else {
                            axios.post(axios.defaults.baseURL === BASE_URL ? "/api/v1/auth/refreshToken" : "https://api.fublog.tech/api/v1/auth/refreshToken", {}, {
                                headers: {
                                    'Authorization': `Bearer ${refreshToken}`,
                                    'Content-Type': 'application/json',
                                }
                            })
                                .then(response => {
                                    localStorage.setItem('token', JSON.stringify(response.data.token));
                                    config.headers!['Authorization'] = `Bearer ${response.data.token}`;

                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        }
                    }
                } else {
                    config.headers!['Authorization'] = `Bearer ${token}`;
                    return config;
                }
            }
        }

        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token');
            if (token) {

                const exp: user = jwt(token);
                if (exp.exp < Date.now() / 1000) {
                    const refreshToken = sessionStorage.getItem('refreshToken');
                    if (refreshToken) {
                        const expRefreshToken: user = jwt(refreshToken);
                        if (expRefreshToken.exp < Date.now() / 1000) {
                            sessionStorage.clear();
                            axios.defaults.baseURL = BASE_URL;

                            return config;
                        } else {
                            axios.post(axios.defaults.baseURL === BASE_URL ? "/api/v1/auth/refreshToken" : "https://api.fublog.tech/api/v1/auth/refreshToken", {}, {
                                headers: {
                                    'Authorization': `Bearer ${refreshToken}`,
                                    'Content-Type': 'application/json',
                                }
                            })
                                .then(response => {
                                    sessionStorage.setItem('token', JSON.stringify(response.data.token));
                                    config.headers!['Authorization'] = `Bearer ${response.data.token}`;

                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        }
                    }
                } else {
                    config.headers!['Authorization'] = `Bearer ${token}`;

                    return config;
                }
            }
        }

        return config;
    }, function (error) {
        // Do something with request error
        console.log(error);
        return Promise.reject(error);
    });
}
