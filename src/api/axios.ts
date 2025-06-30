import axios from 'axios';
import { getToken } from '../utils/auth';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: 'application/json',
	},
});

api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;
