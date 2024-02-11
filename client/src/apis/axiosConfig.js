import axios from 'axios';
import { server_url } from '../environment/variables';

// Retrieve token from localStorage
const token = localStorage.getItem('access_token');

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: server_url,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
