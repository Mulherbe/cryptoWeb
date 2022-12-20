import http from '../api_call';

export const getCryptoFav = () => {
    return http.get('/crypto/favorites');
}

export const getCrypto = () => {
    return http.get('/crypto/favorites');
}

export const getCryptoById = (id) => {
    return http.get(`/crypto/${id}`);
}


