/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { format } from 'date-fns';

const MonthlyReportTable = ({ loans, deleteLoan }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box sx={{ width: '100%', overflow: 'auto' }}>
			{loans.length > 0 ? (
				isMobile ? (
					<Box>
						{loans.map((loan) => (
							<Paper key={loan.id} sx={{ mb: 2, p: 2 }}>
								<Typography variant="body1">
									Book: {loan.bookTitle} by {loan.bookAuthor}
								</Typography>
								<Typography variant="body2">
									Loan Date: {format(new Date(loan.loanDate), 'MMMM dd, yyyy')}
								</Typography>
								<Typography variant="body2">
									Return Date: {loan.returnDate || 'Not returned yet'}
								</Typography>
								<Typography variant="body2">
									Loan Duration: {loan.loanDuration} days
								</Typography>
								<Typography variant="body2">
									User: {loan.userName} ({loan.userEmail})
								</Typography>
								<Typography variant="body2">
									Overdue: {loan.overdue ? 'Yes' : 'No'}
								</Typography>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										mt: 2,
									}}>
									{/* <Button
										variant="contained"
										color="secondary"
										onClick={() => deleteLoan(loan.id)}>
										Delete
									</Button> */}
								</Box>
							</Paper>
						))}
					</Box>
				) : (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="loans table">
							<TableHead>
								<TableRow>
									<TableCell>Book Title</TableCell>
									<TableCell>Author</TableCell>
									<TableCell>Loan Date</TableCell>
									<TableCell>Return Date</TableCell>
									<TableCell>Loan Duration</TableCell>
									<TableCell>User</TableCell>
									<TableCell>Overdue</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loans.map((loan) => (
									<TableRow key={loan.id}>
										<TableCell>{loan.bookTitle}</TableCell>
										<TableCell>{loan.bookAuthor}</TableCell>
										<TableCell>
											{format(new Date(loan.loanDate), 'MMMM dd, yyyy')}
										</TableCell>
										<TableCell>
											{loan.returnDate || 'Not returned yet'}
										</TableCell>
										<TableCell>{loan.loanDuration} days</TableCell>
										<TableCell>
											{loan.userName} ({loan.userEmail})
										</TableCell>
										<TableCell>{loan.overdue ? 'Yes' : 'No'}</TableCell>
										{/* <TableCell align="center">
											<Button
												variant="contained"
												color="secondary"
												onClick={() => deleteLoan(loan.id)}>
												Delete
											</Button>
										</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)
			) : (
				<Typography>No loans found for the selected period.</Typography>
			)}
		</Box>
	);
};

export default MonthlyReportTable;
