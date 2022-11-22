import http from '../api_call';

export const getUser = () => {
    return http.get('/users');
}