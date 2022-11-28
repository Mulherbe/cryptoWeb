import axios from 'axios';

const http = axios.create({
  baseURL : 'http://localhost:5000/api',
  responseType: "json",
  method: "GET",
  ContentType:"application/json",
  headers: {
      "Access-Control-Allow-Origin": 'http://localhost:5000/api'
  },
});

export default http;
