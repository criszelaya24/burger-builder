import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burguer-builder-44aae.firebaseio.com/'
});

export default instance;