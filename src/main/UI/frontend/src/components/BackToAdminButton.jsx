import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const BackToAdminButton = () => {
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const checkAdminStatus = async () => {
			try {
				const response = await axios.get('/api/users/me');
				const userRoles = response.data.roles;
				if (userRoles.includes('ROLE_ADMIN')) {
					setIsAdmin(true);
				}
			} catch (error) {
				console.error('Failed to fetch user data:', error);
			}
		};

		checkAdminStatus();
	}, []);

	if (!isAdmin) {
		return null;
	}

	return <button onClick={() => navigate('/admin-dashboard')}>Back to Admin Dashboard</button>;
};

export default BackToAdminButton;
