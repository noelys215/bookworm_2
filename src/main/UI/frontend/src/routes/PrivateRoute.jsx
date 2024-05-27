/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const PrivateRoute = ({ roles }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get('/api/users/me');
				const userRoles = response.data.roles;
				if (userRoles && userRoles.some((role) => roles.includes(role))) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				setIsAuthenticated(false);
			}
		};

		fetchUserData();
	}, [roles]);

	if (isAuthenticated === null) {
		return <div>Loading...</div>;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
