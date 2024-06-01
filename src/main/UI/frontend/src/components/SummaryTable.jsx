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
} from '@mui/material';

const SummaryTable = ({ summary }) => {
	return (
		<Box sx={{ width: { sm: '100%', md: '30%' }, overflow: 'auto', margin: 'auto' }}>
			<TableContainer component={Paper}>
				<Table sx={{}} aria-label="summary table">
					<TableHead>
						<TableRow>
							<TableCell>Metric</TableCell>
							<TableCell>Value</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>Total Overdue Books</TableCell>
							<TableCell>{summary.totalOverdueBooks}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Total Books Lost</TableCell>
							<TableCell>{summary.totalBooksLost}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Total Books Taken Out</TableCell>
							<TableCell>{summary.totalBooksTakenOut}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Total Books On Loan</TableCell>
							<TableCell>{summary.totalBooksOnLoan}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Total Books Returned</TableCell>
							<TableCell>{summary.totalBooksReturned}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default SummaryTable;
