/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import axios from '../utils/axiosConfig.js';
import Layout from '../layouts/Layout.jsx';
import UserForm from '../components/UserForm';
import LoansTable from '../components/LoansTable';
import { Typography, Alert } from '@mui/material';
import '@fontsource-variable/open-sans';

const Dashboard = ({ title }) => {
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

	const handleReturnBook = async (loan) => {
		const confirmReturn = window.confirm('Are you sure you want to return this book?');
		if (confirmReturn) {
			try {
				await axios.put(`/api/loans/return/${loan.id}`);
				alert('Book returned successfully');
				setUserLoans(userLoans.filter((l) => l.id !== loan.id));
			} catch (error) {
				setError('Failed to return the book.');
			}
		}
	};

	const handleMarkLost = async (loan) => {
		const confirmLost = window.confirm('Are you sure you want to report this book as lost?');
		if (confirmLost) {
			try {
				await axios.put(`/api/loans/mark-lost/${loan.id}`);
				alert('Book marked as lost');
				setUserLoans(userLoans.filter((l) => l.id !== loan.id));
			} catch (error) {
				setError('Failed to mark the book as lost.');
			}
		}
	};

	return (
		<Layout title={'Dashboard'}>
			<Typography variant="h2">{title}</Typography>

			{error && <Alert severity="error">{error}</Alert>}

			<UserForm
				formTitle="User Details"
				userDetails={userDetails}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				buttonLabel="Update Details"
				password={password}
				handlePasswordChange={handlePasswordChange}
				handlePasswordSubmit={handlePasswordSubmit}
				passwordButtonLabel="Update Password"
			/>

			<LoansTable
				title={'Loans'}
				loans={userLoans}
				handleReturnBook={handleReturnBook}
				handleMarkLost={handleMarkLost}
			/>
		</Layout>
	);
};

export default Dashboard;
