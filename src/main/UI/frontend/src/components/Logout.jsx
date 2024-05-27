import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig.js';

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

	return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
