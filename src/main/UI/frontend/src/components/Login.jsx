import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig.js';
import qs from 'qs';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		const data = qs.stringify({
			username,
			password,
		});

		try {
			const response = await axios.post('/login', data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			if (response.status === 200) {
				navigate('/dashboard');
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setError('Invalid credentials');
			} else {
				setError('An error occurred. Please try again.');
			}
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
