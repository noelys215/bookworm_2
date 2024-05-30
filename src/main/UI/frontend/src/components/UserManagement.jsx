import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

const UserManagement = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResult, setSearchResult] = useState(null);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchAllUsers();
	}, []);

	const fetchAllUsers = async () => {
		try {
			const response = await axios.get('/api/users');
			setUsers(response.data);
		} catch (error) {
			console.error('Failed to fetch users:', error);
			setError('Failed to fetch users');
		}
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get(`/api/users/email/${searchQuery}`);
			setSearchResult(response.data);
			setError('');
		} catch (error) {
			console.error('Failed to search user:', error);
			setError('No User Found');
			setSearchResult(null);
		}
	};

	const handleDeleteUser = async (userId) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			try {
				await axios.delete(`/api/users/${userId}`);
				setUsers(users.filter((user) => user.id !== userId));
				if (searchResult && searchResult.id === userId) {
					setSearchResult(null);
				}
			} catch (error) {
				console.error('Failed to delete user:', error);
				alert(error.response?.data || 'Failed to delete user');
			}
		}
	};

	const handleAssignAdmin = async (userEmail) => {
		if (window.confirm('Are you sure you want to assign this user as admin?')) {
			try {
				await axios.post('/api/users/assign-role', {
					email: userEmail,
					roleName: 'ROLE_ADMIN',
				});
				alert('Admin role assigned successfully');
			} catch (error) {
				console.error('Failed to assign admin role:', error);
				alert('Failed to assign admin role');
			}
		}
	};

	const renderUsers = (usersList) => (
		<ul>
			{usersList.map((user) => (
				<li key={user.id}>
					<p>Name: {user.name}</p>
					<p>Email: {user.email}</p>
					<button onClick={() => handleDeleteUser(user.id)}>Delete</button>
					<button onClick={() => handleAssignAdmin(user.email)}>Assign Admin</button>
				</li>
			))}
		</ul>
	);

	return (
		<div>
			<h2>User Management</h2>
			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search by email"
				/>
				<button type="submit">Search</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{searchResult ? (
				<div>
					<h3>Search Result</h3>
					{renderUsers([searchResult])}
				</div>
			) : (
				<div>
					<h3>All Users</h3>
					{renderUsers(users)}
				</div>
			)}
		</div>
	);
};

export default UserManagement;

// POP UP NOTIFICATION FOR OVERDUE BOOKS
