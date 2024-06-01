import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { format, differenceInDays } from 'date-fns';
import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Button,
	useMediaQuery,
	useTheme,
	CircularProgress,
} from '@mui/material';

const ActiveLoans = () => {
	const [loans, setLoans] = useState([]);
	const [filter, setFilter] = useState('all');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchLoans();
	}, []);

	const fetchLoans = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/loans/active');
			const loansWithOverdue = response.data.map((loan) => ({
				...loan,
				overdue:
					!loan.returnDate && differenceInDays(new Date(), new Date(loan.loanDate)) > 14,
			}));
			setLoans(loansWithOverdue);
		} catch (error) {
			console.error('Failed to fetch loans:', error);
		} finally {
			setLoading(false);
		}
	};

	const deleteLoan = async (loanId) => {
		const confirmed = window.confirm('Are you sure you want to delete this loan?');
		if (confirmed) {
			setLoading(true);
			try {
				await axios.delete(`/api/loans/${loanId}`);
				setLoans(loans.filter((loan) => loan.id !== loanId));
			} catch (error) {
				console.error('Failed to delete loan:', error);
			} finally {
				setLoading(false);
			}
		}
	};

	const filteredLoans = loans.filter((loan) => {
		if (filter === 'overdue') {
			return loan.overdue;
		} else if (filter === 'lost') {
			return loan.lost;
		} else {
			return true;
		}
	});

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
				<FormControl component="fieldset">
					<RadioGroup row value={filter} onChange={(e) => setFilter(e.target.value)}>
						<FormControlLabel value="all" control={<Radio />} label="All" />
						<FormControlLabel value="overdue" control={<Radio />} label="Overdue" />
						<FormControlLabel value="lost" control={<Radio />} label="Lost" />
					</RadioGroup>
				</FormControl>
			</Box>
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
					<CircularProgress />
				</Box>
			) : filteredLoans.length > 0 ? (
				isMobile ? (
					<Box sx={{ mt: 2 }}>
						{filteredLoans.map((loan) => (
							<Paper key={loan.id} sx={{ mb: 2, p: 2 }}>
								<Typography variant="body1">
									Book Title: {loan.book.title}
								</Typography>
								<Typography variant="body2">Author: {loan.book.author}</Typography>
								<Typography variant="body2">ISBN: {loan.book.isbn}</Typography>
								<Typography variant="body2">Genre: {loan.book.genre}</Typography>
								<Typography variant="body2">Year: {loan.book.year}</Typography>
								<Typography variant="body2">
									User: {loan.user.name} ({loan.user.email})
								</Typography>
								<Typography variant="body2">
									Loan Date: {format(new Date(loan.loanDate), 'MMMM dd, yyyy')}
								</Typography>
								<Typography variant="body2">
									Return Date:{' '}
									{loan.returnDate
										? format(new Date(loan.returnDate), 'MMMM dd, yyyy')
										: 'Not returned yet'}
								</Typography>
								<Typography variant="body2">
									Lost: {loan.lost ? 'Yes' : 'No'}
								</Typography>
								{loan.lost && loan.lostDate && (
									<Typography variant="body2">
										Lost Date:{' '}
										{format(new Date(loan.lostDate), 'MMMM dd, yyyy')}
									</Typography>
								)}
								<Typography variant="body2">
									Overdue: {loan.overdue ? 'Yes' : 'No'}
								</Typography>
								<Button
									variant="contained"
									color="secondary"
									onClick={() => deleteLoan(loan.id)}>
									Delete
								</Button>
							</Paper>
						))}
					</Box>
				) : (
					<TableContainer component={Paper} sx={{ mt: 2 }}>
						<Table sx={{ minWidth: 650 }} aria-label="active loans table">
							<TableHead>
								<TableRow>
									<TableCell>Book Title</TableCell>
									<TableCell>Author</TableCell>
									<TableCell>ISBN</TableCell>
									<TableCell>Genre</TableCell>
									<TableCell>Year</TableCell>
									<TableCell>User</TableCell>
									<TableCell>Loan Date</TableCell>
									<TableCell>Return Date</TableCell>
									<TableCell>Lost</TableCell>
									<TableCell>Overdue</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredLoans.map((loan) => (
									<TableRow key={loan.id}>
										<TableCell>{loan.book.title}</TableCell>
										<TableCell>{loan.book.author}</TableCell>
										<TableCell>{loan.book.isbn}</TableCell>
										<TableCell>{loan.book.genre}</TableCell>
										<TableCell>{loan.book.year}</TableCell>
										<TableCell>
											{loan.user.name} ({loan.user.email})
										</TableCell>
										<TableCell>
											{format(new Date(loan.loanDate), 'MMMM dd, yyyy')}
										</TableCell>
										<TableCell>
											{loan.returnDate
												? format(new Date(loan.returnDate), 'MMMM dd, yyyy')
												: 'Not returned yet'}
										</TableCell>
										<TableCell>{loan.lost ? 'Yes' : 'No'}</TableCell>
										<TableCell>{loan.overdue ? 'Yes' : 'No'}</TableCell>
										<TableCell align="center">
											<Button
												variant="contained"
												color="secondary"
												onClick={() => deleteLoan(loan.id)}>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)
			) : (
				<Typography sx={{ mt: 2 }}>No active loans found.</Typography>
			)}
		</Box>
	);
};

export default ActiveLoans;
