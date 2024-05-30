import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig.js';

const BackToDashboardButton = () => {
	const navigate = useNavigate();
	// eslint-disable-next-line no-unused-vars
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const fetchUserRoles = async () => {
			try {
				const response = await axios.get('/api/users/me');
				const roles = response.data.roles;
				if (roles.includes('ROLE_ADMIN')) {
					setIsAdmin(true);
				}
			} catch (error) {
				console.error('Error fetching user roles:', error);
			}
		};

		fetchUserRoles();
	}, []);

	const handleBackToDashboard = () => {
		// if (isAdmin) {
		// 	navigate('/admin-dashboard');
		// } else {
		navigate('/dashboard');
		// }
	};

	return <button onClick={handleBackToDashboard}>Back to Dashboard</button>;
};

export default BackToDashboardButton;
