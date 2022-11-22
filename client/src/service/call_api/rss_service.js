import http from '../api_call';

export const getActu = () => {
    return http.get('/rss/actu');
}