import { useState } from 'react';
import axios from '../utils/axiosConfig.js';

const SignUp = () => {
	const [user, setUser] = useState({ name: '', email: '', password: '' });
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('/api/users', user);
			setMessage('Sign up successful. Please sign in.');
		} catch (error) {
			setMessage('Sign up failed. Please try again.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			{message && <p>{message}</p>}
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={user.name}
				onChange={handleChange}
				required
			/>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={user.email}
				onChange={handleChange}
				required
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={user.password}
				onChange={handleChange}
				required
			/>
			<button type="submit">Sign Up</button>
		</form>
	);
};

export default SignUp;
