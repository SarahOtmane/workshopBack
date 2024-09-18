import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-retrometroid.devprod.fr/wp-json/wc/v3/products'
});

const auth = {
    username: process.env.API_KEY,
    password: process.env.API_SECRET
};

instance.interceptors.request.use(config => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //     config.headers['Authorization'] = `Bearer ${token}`;
    // }
    config.headers['Authorization'] = `Bearer ${auth}`;
    return config;
}, error => {
    return Promise.reject(error);
});
