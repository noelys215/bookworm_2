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
} from '@mui/material';

const BooksTable = ({ books, onSelectBook, selectedBooks }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	console.log(books);
	return (
		<Box sx={{ width: '100%', height: '755px', overflow: 'auto' }}>
			{books.length > 0 ? (
				isMobile ? (
					<Box>
						{books.map((book) => (
							<Paper key={book.id} sx={{ mb: 2, p: 2 }}>
								<Typography variant="body1">Title: {book.title}</Typography>
								<Typography variant="body2">Author: {book.author}</Typography>
								<Typography variant="body2">Genre: {book.genre}</Typography>
								<Typography variant="body2">ISBN: {book.isbn}</Typography>
								<Typography variant="body2">Stock: {book.quantity}</Typography>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										mt: 2,
									}}>
									<Button
										variant="contained"
										color={
											selectedBooks.includes(book.id)
												? 'secondary'
												: 'primary'
										}
										onClick={() => onSelectBook(book.id)}>
										{selectedBooks.includes(book.id) ? 'Deselect' : 'Select'}
									</Button>
								</Box>
							</Paper>
						))}
					</Box>
				) : (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="books table">
							<TableHead>
								<TableRow
									sx={{
										backgroundColor: '#F9F6EE',
										fontFamily: 'Open Sans Variable',
									}}>
									<TableCell>Title</TableCell>
									<TableCell>Author</TableCell>
									<TableCell>Genre</TableCell>
									<TableCell>ISBN</TableCell>
									<TableCell>Stock</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{books.map((book) => (
									<TableRow
										key={book.id}
										sx={{
											backgroundColor: '#F9F6EE',
											fontFamily: 'Open Sans Variable',
										}}>
										<TableCell>{book.title}</TableCell>
										<TableCell>{book.author}</TableCell>
										<TableCell>{book.genre}</TableCell>
										<TableCell>{book.isbn}</TableCell>
										<TableCell>{book.quantity}</TableCell>
										<TableCell align="center">
											<Button
												variant="contained"
												color={
													selectedBooks.includes(book.id)
														? 'secondary'
														: 'primary'
												}
												onClick={() => onSelectBook(book.id)}>
												{selectedBooks.includes(book.id)
													? 'Deselect'
													: 'Select'}
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)
			) : (
				<Typography>No books found.</Typography>
			)}
		</Box>
	);
};

export default BooksTable;
