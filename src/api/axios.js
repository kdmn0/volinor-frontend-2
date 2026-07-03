import axios from 'axios';
import i18n from '../i18n';

const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000' 
});

api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = i18n.language || 'tr';
  return config;
});

export default api;
