import axios from 'axios';
import i18n from '../i18n';

const api = axios.create({ baseURL: 'http://localhost:8000' });

api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = i18n.language || 'tr';
  return config;
});

export default api;
