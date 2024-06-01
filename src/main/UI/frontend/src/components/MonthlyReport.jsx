import { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import axios from '../utils/axiosConfig.js';
import {
	Box,
	MenuItem,
	Select,
	Typography,
	FormControl,
	InputLabel,
	Alert,
	Divider,
	Chip,
	CircularProgress,
} from '@mui/material';
import MonthlyReportTable from '../components/MonthlyReportTable';
import SummaryTable from '../components/SummaryTable';

const MonthlyReport = () => {
	// eslint-disable-next-line no-unused-vars
	const [userDetails, setUserDetails] = useState({});
	const [report, setReport] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth() + 1); // January is 0!

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchReport = async (year, month) => {
		try {
			setLoading(true);
			const response = await axios.get(`/api/reports/monthly?year=${year}&month=${month}`);
			setReport(response.data);
		} catch (error) {
			setError('Failed to fetch report.');
		} finally {
			setLoading(false);
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

	const deleteLoan = async (loanId) => {
		const confirmed = window.confirm('Are you sure you want to delete this loan?');
		if (confirmed) {
			setLoading(true);
			try {
				await axios.delete(`/api/loans/${loanId}`);
				fetchReport(year, month);
			} catch (error) {
				console.error('Failed to delete loan:', error);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Box>
			{error && <Alert severity="error">{error}</Alert>}

			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
				<FormControl sx={{ mr: 2 }}>
					<InputLabel>Year</InputLabel>
					<Select value={year} onChange={handleYearChange}>
						{[...Array(5)].map((_, i) => (
							<MenuItem key={i} value={new Date().getFullYear() - i}>
								{new Date().getFullYear() - i}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel>Month</InputLabel>
					<Select value={month} onChange={handleMonthChange}>
						{Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
							<MenuItem key={m} value={m}>
								{new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
					<CircularProgress />
				</Box>
			) : report ? (
				<Box>
					<Divider variant="middle">
						<Chip
							label="Summary"
							sx={{
								fontSize: '1.1rem',
								mb: 1,
								fontFamily: 'Open Sans Variable',
							}}
						/>
					</Divider>
					<SummaryTable summary={report.summary} />
					<Divider sx={{ mt: 1 }}>
						<Chip
							label="Loans"
							sx={{
								fontSize: '1.1rem',
								mb: 1,
								fontFamily: 'Open Sans Variable',
							}}
						/>
					</Divider>
					<MonthlyReportTable loans={report.loans} deleteLoan={deleteLoan} />
				</Box>
			) : (
				<Typography>No report found for the selected month and year.</Typography>
			)}
		</Box>
	);
};

export default MonthlyReport;
