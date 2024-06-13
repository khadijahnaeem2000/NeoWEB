import axios from 'axios';
// import authHeader from '../auth/authHeader';
import { endPoint } from '../../config/config';

let Api;

Api = axios.create({
  baseURL: endPoint,
  headers: {
    'Content-type': 'application/json',
    // 'Content-Length': 'application/json',
    // Host: 'application/json',
    // 'User-Agent': 'application/json',
    // Accept: '*/*',
    // // 'Cache-Control': 'no-cache',
    // // 'Postman-Token': 'application/json',
    // Connection: 'keep-alive',
  },
});

export default Api;
