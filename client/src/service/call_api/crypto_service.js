import http from '../api_call';

export const getCryptoFav = () => {
    return http.get('/crypto/favorites/1');
}

