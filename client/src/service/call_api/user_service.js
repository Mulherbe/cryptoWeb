import http from '../api_call';

export const getUser = () => {
    return http.get('/users');
}

export const registerUser = (values) => {
    return http.post('/users/create', {
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword
      });
}


export const loginUser = (values) => {
    return http.post('/users/create', {
        email: values.email,
        password: values.password,
      });
}