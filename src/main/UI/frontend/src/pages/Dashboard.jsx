import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import Logout from '../components/Logout';
import BackToExploreButton from '../components/BackToExploreButton';
import axios from '../utils/axiosConfig.js';
import BackToAdminButton from '../components/BackToAdminButton.jsx';

const Dashboard = () => {
	const [userDetails, setUserDetails] = useState({});
	const [userLoans, setUserLoans] = useState([]);
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const details = await UserService.getUserDetails();
				setUserDetails(details);
				const loans = await UserService.getUserLoans();
				setUserLoans(loans);
			} catch (error) {
				setError('Failed to fetch user data.');
			}
		};

		fetchUserData();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await UserService.updateUserDetails(userDetails);
			alert('Details updated successfully');
			navigate('/dashboard');
		} catch (error) {
			setError('Failed to update details.');
		}
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		try {
			await UserService.updateUserPassword(password);
			alert('Password updated successfully');
			navigate('/dashboard');
		} catch (error) {
			setError('Failed to update password.');
		}
	};

	const handleReturnBook = async (loanId) => {
		const confirmReturn = window.confirm('Are you sure you want to return this book?');
		if (confirmReturn) {
			try {
				await axios.put(`/api/loans/return/${loanId}`);
				alert('Book returned successfully');
				setUserLoans(userLoans.filter((loan) => loan.id !== loanId));
			} catch (error) {
				setError('Failed to return the book.');
			}
		}
	};

	const handleMarkLost = async (loanId) => {
		const confirmLost = window.confirm('Are you sure you want to report this book as lost?');
		if (confirmLost) {
			try {
				await axios.put(`/api/loans/mark-lost/${loanId}`);
				alert('Book marked as lost');
				setUserLoans(userLoans.filter((loan) => loan.id !== loanId));
			} catch (error) {
				setError('Failed to mark the book as lost.');
			}
		}
	};

	return (
		<div>
			<h2>Dashboard</h2>
			<BackToExploreButton />
			<Logout />
			<BackToAdminButton />
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<h3>User Details</h3>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={userDetails.name || ''}
					onChange={handleChange}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={userDetails.email || ''}
					onChange={handleChange}
					required
				/>
				<button type="submit">Update Details</button>
			</form>
			<form onSubmit={handlePasswordSubmit}>
				<h3>Change Password</h3>
				<input
					type="password"
					name="password"
					placeholder="New Password"
					value={password}
					onChange={handlePasswordChange}
					required
				/>
				<button type="submit">Update Password</button>
			</form>
			<h3>Loans</h3>
			{userLoans.length > 0 ? (
				<ul>
					{userLoans.map((loan) => (
						<li key={loan.id}>
							<p>
								Book: {loan.book.title} by {loan.book.author}
							</p>
							<p>Loan Date: {loan.loanDate}</p>
							<p>Return Date: {loan.returnDate || 'Not returned yet'}</p>
							<p>Overdue: {loan.isOverdue ? 'Yes' : 'No'}</p>
							<button onClick={() => handleReturnBook(loan.id)}>Return Book</button>
							<button onClick={() => handleMarkLost(loan.id)}>Report Lost</button>
						</li>
					))}
				</ul>
			) : (
				<p>No loans found.</p>
			)}
		</div>
	);
};

export default Dashboard;
