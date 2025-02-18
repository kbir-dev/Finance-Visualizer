import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? '/api'  // Production URL
    : 'http://localhost:5001' // Development URL
});

export default api; 