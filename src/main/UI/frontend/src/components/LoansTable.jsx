/* eslint-disable react/prop-types */
import {
	Box,
	Typography,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useMediaQuery,
	useTheme,
	Divider,
	Chip,
} from '@mui/material';
import '@fontsource-variable/open-sans';

const LoansTable = ({ title, loans, handleReturnBook, handleMarkLost }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box>
			<Divider variant="middle">
				<Chip
					label={title}
					sx={{ fontSize: '1.1rem', mb: 1, mt: 1.3, fontFamily: 'Open Sans Variable' }}
				/>
			</Divider>
			{loans.length > 0 ? (
				isMobile ? (
					<Box>
						{loans.map((loan) => (
							<Box
								key={loan.id}
								sx={{
									mb: 2,
									p: 2,
									backgroundColor: '#F9F6EE',
									borderBottom: 'solid 1px',
								}}>
								<Typography variant="body1">Book: {loan.book.title}</Typography>
								<Typography variant="body2">Author: {loan.book.author}</Typography>
								<Typography variant="body2">Loan Date: {loan.loanDate}</Typography>
								<Typography variant="body2">
									Return Date: {loan.returnDate || 'Not returned yet'}
								</Typography>
								<Typography variant="body2">
									Overdue: {loan.isOverdue ? 'Yes' : 'No'}
								</Typography>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										mt: 2,
									}}>
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleReturnBook(loan)}>
										Return Book
									</Button>
									<Button
										variant="contained"
										color="secondary"
										onClick={() => handleMarkLost(loan)}>
										Report Lost
									</Button>
								</Box>
							</Box>
						))}
					</Box>
				) : (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="loan table">
							<TableHead>
								<TableRow
									sx={{
										backgroundColor: '#F9F6EE',
										fontFamily: 'Open Sans Variable',
									}}>
									<TableCell>Book Title</TableCell>
									<TableCell>Author</TableCell>
									<TableCell>Loan Date</TableCell>
									<TableCell>Return Date</TableCell>
									<TableCell>Overdue</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loans.map((loan) => (
									<TableRow key={loan.id} sx={{ backgroundColor: '#F9F6EE' }}>
										<TableCell>{loan.book.title}</TableCell>
										<TableCell>{loan.book.author}</TableCell>
										<TableCell>{loan.loanDate}</TableCell>
										<TableCell>
											{loan.returnDate || 'Not returned yet'}
										</TableCell>
										<TableCell>{loan.isOverdue ? 'Yes' : 'No'}</TableCell>
										<TableCell align="center">
											<Button
												variant="contained"
												color="primary"
												sx={{ mr: 1 }}
												onClick={() => handleReturnBook(loan)}>
												Return Book
											</Button>
											<Button
												variant="contained"
												color="secondary"
												onClick={() => handleMarkLost(loan)}>
												Report Lost
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)
			) : (
				<Typography>No loans found.</Typography>
			)}
		</Box>
	);
};

export default LoansTable;
