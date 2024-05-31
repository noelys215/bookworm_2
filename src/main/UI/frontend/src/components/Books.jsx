/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import BooksTable from './BooksTable';
import { Box, Button, Chip, Divider } from '@mui/material';

const Books = ({ onSelectBook, selectedBooks }) => {
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const [page, setPage] = useState(0);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await axios.get(`/api/books?page=${page}&size=10`);
				setBooks(response.data.content);
			} catch (error) {
				setError('Failed to fetch books');
			}
		};

		fetchBooks();
	}, [page]);

	const handleNextPage = () => setPage(page + 1);
	const handlePreviousPage = () => setPage(page > 0 ? page - 1 : 0);

	return (
		<div>
			<Divider variant="middle">
				<Chip
					label="All Books"
					sx={{
						fontSize: '1.1rem',
						mb: 1,
						fontFamily: 'Open Sans Variable',
					}}
				/>
			</Divider>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<BooksTable books={books} onSelectBook={onSelectBook} selectedBooks={selectedBooks} />
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
				<Button onClick={handlePreviousPage} disabled={page === 0}>
					Previous
				</Button>
				<Button onClick={handleNextPage}>Next</Button>
			</Box>
		</div>
	);
};

export default Books;
