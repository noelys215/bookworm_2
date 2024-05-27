import { useNavigate } from 'react-router-dom';

const BackToExploreButton = () => {
	const navigate = useNavigate();

	const goToExplorePage = () => navigate('/explore');

	return <button onClick={goToExplorePage}>Explore Books</button>;
};

export default BackToExploreButton;
