import { Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackToExploreButton = () => {
	const navigate = useNavigate();

	const goToExplorePage = () => navigate('/explore');

	return <Tab onClick={goToExplorePage} label="Explore Books" />;
};

export default BackToExploreButton;
