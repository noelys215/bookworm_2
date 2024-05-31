import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig.js';
import { Container, Box, Avatar, Button, TextField, Link, Grid, Typography } from '@mui/material';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';

const AuthForm = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [user, setUser] = useState({ name: '', email: '', password: '' });
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			await axios.post('/api/users', user);
			setMessage('Sign up successful. Please sign in.');
			setIsSignUp(false);
		} catch (error) {
			setMessage('Sign up failed. Please try again.');
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const data = new URLSearchParams({ username, password });

		try {
			const response = await axios.post('/login', data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			if (response.status === 200) {
				const userResponse = await axios.get('/api/users/me');
				const roles = userResponse.data.roles;
				if (roles.includes('ROLE_ADMIN')) {
					navigate('/admin-dashboard');
				} else {
					navigate('/dashboard');
				}
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
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, backgroundColor: '#1976d2' }}>
					<MenuBookTwoToneIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{isSignUp ? 'Sign Up' : 'Sign In'}
				</Typography>
				<Box
					component="form"
					onSubmit={isSignUp ? handleSignUp : handleLogin}
					sx={{ mt: 1 }}>
					{isSignUp && (
						<TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Name"
							name="name"
							autoComplete="name"
							autoFocus
							value={user.name}
							onChange={handleChange}
						/>
					)}
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus={!isSignUp}
						value={isSignUp ? user.email : username}
						onChange={(e) => (isSignUp ? handleChange(e) : setUsername(e.target.value))}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={isSignUp ? user.password : password}
						onChange={(e) => (isSignUp ? handleChange(e) : setPassword(e.target.value))}
					/>

					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						{isSignUp ? 'Sign Up' : 'Sign In'}
					</Button>
					{error && <Typography color="error">{error}</Typography>}
					{message && <Typography color="primary">{message}</Typography>}
					<Grid container>
						<Grid item>
							<Link href="#" variant="body2" onClick={() => setIsSignUp(!isSignUp)}>
								{isSignUp
									? 'Already have an account? Sign In'
									: "Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default AuthForm;
