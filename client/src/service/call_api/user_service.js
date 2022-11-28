import http from '../api_call';

export const getUser = () => {
    return http.get('/users');
}

export const registerUser = () => {
    return http.post('/users');
}