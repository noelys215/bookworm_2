import { useNavigate } from 'react-router-dom';

const BackToDashboardButton = () => {
	const navigate = useNavigate();

	const handleBackToDashboard = () => {
		navigate('/dashboard');
	};

	return <button onClick={handleBackToDashboard}>Back to Dashboard</button>;
};

export default BackToDashboardButton;
