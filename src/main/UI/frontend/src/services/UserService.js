import axiosConfig from '../utils/axiosConfig.js';

const API_URL = 'http://localhost:8080/api/users';

const getUserDetails = async () => {
	const response = await axiosConfig.get(`${API_URL}/me`);
	return response.data;
};

const updateUserDetails = async (userDetails) => {
	const response = await axiosConfig.put(`${API_URL}/me`, userDetails);
	return response.data;
};

const getUserLoans = async () => {
	const response = await axiosConfig.get(`${API_URL}/me/loans`);
	return response.data;
};

export default {
	getUserDetails,
	updateUserDetails,
	getUserLoans,
};
