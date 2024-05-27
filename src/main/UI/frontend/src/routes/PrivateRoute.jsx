import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
	const [isAuthenticated, setIsAuthenticated] = React.useState(null);

	React.useEffect(() => {
		axios
			.get('/api/users/me')
			.then(() => {
				setIsAuthenticated(true);
			})
			.catch(() => {
				setIsAuthenticated(false);
			});
	}, []);

	if (isAuthenticated === null) {
		return <div>Loading...</div>; // or a spinner/loading indicator
	}

	return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
