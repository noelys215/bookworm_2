/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import Logout from '../components/Logout';
import BackToExploreButton from '../components/BackToExploreButton';
import axios from '../utils/axiosConfig.js';

const AdminDashboard = () => {
	const [userDetails, setUserDetails] = useState({});
	const [password, setPassword] = useState('');
	const [report, setReport] = useState(null);
	const [error, setError] = useState('');
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth() + 1); // January is 0!

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const details = await UserService.getUserDetails();
				setUserDetails(details);
				fetchReport(year, month);
			} catch (error) {
				setError('Failed to fetch user data.');
			}
		};

		fetchUserData();
	}, []);

	const fetchReport = async (year, month) => {
		try {
			const response = await axios.get(`/api/reports/monthly?year=${year}&month=${month}`);
			setReport(response.data);
		} catch (error) {
			setError('Failed to fetch report.');
		}
	};

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
			navigate('/admin-dashboard');
		} catch (error) {
			setError('Failed to update details.');
		}
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		try {
			await UserService.updateUserPassword(password);
			alert('Password updated successfully');
			navigate('/admin-dashboard');
		} catch (error) {
			setError('Failed to update password.');
		}
	};

	const handleYearChange = (e) => {
		setYear(e.target.value);
		fetchReport(e.target.value, month);
	};

	const handleMonthChange = (e) => {
		setMonth(e.target.value);
		fetchReport(year, e.target.value);
	};

	return (
		<div>
			<h2>Admin Dashboard</h2>
			<BackToExploreButton />
			<Logout />
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
			<h3>Monthly Report</h3>
			<div>
				<label>Year:</label>
				<select value={year} onChange={handleYearChange}>
					{[...Array(5)].map((_, i) => (
						<option key={i} value={new Date().getFullYear() - i}>
							{new Date().getFullYear() - i}
						</option>
					))}
				</select>
				<label>Month:</label>
				<select value={month} onChange={handleMonthChange}>
					{Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
						<option key={m} value={m}>
							{new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
						</option>
					))}
				</select>
			</div>
			{report ? (
				<div>
					<h4>Summary</h4>
					<p>Total Overdue Books: {report.summary.totalOverdueBooks}</p>
					<p>Total Books Lost: {report.summary.totalBooksLost}</p>
					<p>Total Books Taken Out: {report.summary.totalBooksTakenOut}</p>
					<p>Total Books On Loan: {report.summary.totalBooksOnLoan}</p>
					<p>Total Books Returned: {report.summary.totalBooksReturned}</p>
					<h4>Loans</h4>
					<ul>
						{report.loans.map((loan, index) => (
							<li key={index}>
								<p>
									Book: {loan.bookTitle} by {loan.bookAuthor}
								</p>
								<p>Loan Date: {loan.loanDate}</p>
								<p>Return Date: {loan.returnDate || 'Not returned yet'}</p>
								<p>Loan Duration: {loan.loanDuration} days</p>
								<p>
									User: {loan.userName} ({loan.userEmail})
								</p>
								<p>Overdue: {loan.overdue ? 'Yes' : 'No'}</p>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>No report found for the selected month and year.</p>
			)}
		</div>
	);
};

export default AdminDashboard;
