import axios from 'axios';

const isNullOrEmpty = (value) => value === null || value === undefined || value === '';

const url = isNullOrEmpty(process.env.REACT_APP_API_URL) ? 'http://localhost:5000/api' : process.env.REACT_APP_API_URL;

const http = axios.create({
  baseURL: url,
  responseType: "json",
  method: "GET",
  ContentType: "application/json",
  headers: {
    "Access-Control-Allow-Origin": url
  },
});

export default http;
