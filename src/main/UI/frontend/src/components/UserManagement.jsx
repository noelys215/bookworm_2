import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	Alert,
	useMediaQuery,
	useTheme,
	Divider,
	Chip,
	CircularProgress,
} from '@mui/material';

const UserManagement = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResult, setSearchResult] = useState(null);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchAllUsers();
	}, []);

	const fetchAllUsers = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/users');
			setUsers(response.data);
		} catch (error) {
			console.error('Failed to fetch users:', error);
			setError('Failed to fetch users');
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.get(`/api/users/email/${searchQuery}`);
			setSearchResult(response.data);
			setError('');
		} catch (error) {
			console.error('Failed to search user:', error);
			setError('No User Found');
			setSearchResult(null);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteUser = async (userId) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			setLoading(true);
			try {
				await axios.delete(`/api/users/${userId}`);
				setUsers(users.filter((user) => user.id !== userId));
				if (searchResult && searchResult.id === userId) {
					setSearchResult(null);
				}
			} catch (error) {
				console.error('Failed to delete user:', error);
				alert(error.response?.data || 'Failed to delete user');
			} finally {
				setLoading(false);
			}
		}
	};

	const handleAssignAdmin = async (userEmail) => {
		if (window.confirm('Are you sure you want to assign this user as admin?')) {
			setLoading(true);
			try {
				await axios.post('/api/users/assign-role', {
					email: userEmail,
					roleName: 'ROLE_ADMIN',
				});
				alert('Admin role assigned successfully');
				setUsers((prevUsers) =>
					prevUsers.map((user) =>
						user.email === userEmail
							? { ...user, roles: [...(user.roles || []), 'ROLE_ADMIN'] }
							: user
					)
				);
			} catch (error) {
				console.error('Failed to assign admin role:', error);
				alert('Failed to assign admin role');
			} finally {
				setLoading(false);
			}
		}
	};

	const handleRemoveAdmin = async (userEmail) => {
		if (window.confirm('Are you sure you want to remove admin role from this user?')) {
			try {
				await axios.post('/api/users/remove-role', {
					email: userEmail,
					roleName: 'ROLE_ADMIN',
				});
				alert('Admin role removed successfully');
				setUsers((prevUsers) =>
					prevUsers.map((user) =>
						user.email === userEmail
							? { ...user, roles: user.roles.filter((role) => role !== 'ROLE_ADMIN') }
							: user
					)
				);
			} catch (error) {
				console.error('Failed to remove admin role:', error);
			}
		}
	};

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const renderUsers = (usersList) =>
		isMobile ? (
			<Box sx={{ mt: 2 }}>
				{usersList.map((user) => (
					<Paper key={user.id} sx={{ mb: 2, p: 2 }}>
						<Typography variant="body1">Name: {user.name}</Typography>
						<Typography variant="body2">Email: {user.email}</Typography>
						<Typography variant="body2">
							Role:{' '}
							{user.roles && user.roles.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER'}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								mt: 2,
								gap: 1,
							}}>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => handleDeleteUser(user.id)}>
								Delete
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={() => handleAssignAdmin(user.email)}>
								Assign Admin
							</Button>
							<Button
								variant="contained"
								color="warning"
								onClick={() => handleRemoveAdmin(user.email)}>
								Unassign Admin
							</Button>
						</Box>
					</Paper>
				))}
			</Box>
		) : (
			<TableContainer component={Paper} sx={{ mt: 2 }}>
				<Table sx={{ minWidth: 650 }} aria-label="users table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Role</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{usersList.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									{user.roles && user.roles.includes('ROLE_ADMIN')
										? 'ADMIN'
										: 'USER'}
								</TableCell>
								<TableCell align="center">
									<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
										<Button
											variant="contained"
											color="secondary"
											onClick={() => handleDeleteUser(user.id)}>
											Delete
										</Button>
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleAssignAdmin(user.email)}>
											Assign Admin
										</Button>
										<Button
											variant="contained"
											color="warning"
											onClick={() => handleRemoveAdmin(user.email)}>
											Unassign Admin
										</Button>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);

	return (
		<Box>
			<Box
				component="form"
				onSubmit={handleSearch}
				sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
				<TextField
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search by email"
					variant="outlined"
					sx={{ mr: 2 }}
				/>
				<Button type="submit" variant="contained" color="primary">
					Search
				</Button>
			</Box>
			{error && (
				<Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
					<Alert severity="error">{error}</Alert>
				</Box>
			)}
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
					<CircularProgress />
				</Box>
			) : searchResult ? (
				<Box>
					<Divider variant="middle">
						<Chip
							label="Search Result"
							sx={{
								fontSize: '1.1rem',
								mb: 1,
								fontFamily: 'Open Sans Variable',
							}}
						/>
					</Divider>
					{renderUsers([searchResult])}
				</Box>
			) : (
				<Box>
					<Divider variant="middle">
						<Chip
							label="All Users"
							sx={{
								fontSize: '1.1rem',
								mb: 1,
								fontFamily: 'Open Sans Variable',
							}}
						/>
					</Divider>
					{renderUsers(users)}
				</Box>
			)}
		</Box>
	);
};

export default UserManagement;
