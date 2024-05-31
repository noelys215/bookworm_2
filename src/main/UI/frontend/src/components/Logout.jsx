import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig.js';
import { Tab } from '@mui/material';

const Logout = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.post('/logout');
			navigate('/');
		} catch (error) {
			console.error('Failed to logout', error);
		}
	};

	return <Tab onClick={handleLogout} label="Logout" />;
};

export default Logout;
