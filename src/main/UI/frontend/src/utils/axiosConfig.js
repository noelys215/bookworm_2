import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080',
	withCredentials: true, // This ensures cookies are sent with requests
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			// Redirect to login page if not authenticated
			window.location.href = '/';
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
