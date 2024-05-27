import { useState } from 'react';
import Login from '../components/Login';
import SignUp from '../components/Signup';

const Home = () => {
	const [isSignUp, setIsSignUp] = useState(false);

	return (
		<div>
			<h1>Welcome to Bookworm Base</h1>
			{isSignUp ? <SignUp /> : <Login />}
			<button onClick={() => setIsSignUp(!isSignUp)}>
				{isSignUp ? 'Already have an account? Sign In' : 'New here? Sign Up'}
			</button>
		</div>
	);
};

export default Home;
