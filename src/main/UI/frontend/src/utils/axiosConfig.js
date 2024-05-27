// src/utils/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080', // Ensure this points to your backend server
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			window.location.href = '/';
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
