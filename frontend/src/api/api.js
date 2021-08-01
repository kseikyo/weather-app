import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
