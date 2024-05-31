import { useState } from 'react';
import axios from '../utils/axiosConfig.js';
import Layout from '../layouts/Layout.jsx';
import BooksTable from '../components/BooksTable.jsx';
import Books from '../components/Books.jsx';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const ExplorePage = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [selectedBooks, setSelectedBooks] = useState([]);
	const [error, setError] = useState('');

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get(`/api/books/search?query=${searchQuery}`);
			setSearchResults(response.data);
			if (response.data.length === 0) {
				setError('No Books Found, Try Again');
			} else {
				setError('');
			}
		} catch (error) {
			setError('Failed to search books');
		}
	};

	const handleSelectBook = (bookId) => {
		setSelectedBooks((prevSelectedBooks) => {
			if (prevSelectedBooks.includes(bookId)) {
				return prevSelectedBooks.filter((id) => id !== bookId);
			} else {
				return [...prevSelectedBooks, bookId];
			}
		});
	};

	const handleSubmitLoans = async () => {
		try {
			await Promise.all(selectedBooks.map((bookId) => axios.post('/api/loans', { bookId })));
			alert('Loans submitted successfully');
			setSelectedBooks([]);
		} catch (error) {
			setError('Failed to submit loans');
		}
	};

	return (
		<Layout title={'Explore Books'}>
			<Box
				component="form"
				onSubmit={handleSearch}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mt: 3,
					mb: 3,
				}}>
				<TextField
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search by title, author, or genre"
					variant="outlined"
					sx={{ mr: 2, width: { xs: '100%', sm: 'auto', md: '50%' } }}
				/>
				<Button type="submit" variant="contained" color="primary">
					Search
				</Button>
			</Box>
			{error && (
				<Alert severity="error" sx={{ textAlign: 'center' }}>
					{error}
				</Alert>
			)}
			{searchResults.length > 0 ? (
				<BooksTable
					books={searchResults}
					onSelectBook={handleSelectBook}
					selectedBooks={selectedBooks}
				/>
			) : (
				<>
					{searchQuery && (
						<Typography align="center">No Books Found, Try Again</Typography>
					)}
					<Books onSelectBook={handleSelectBook} selectedBooks={selectedBooks} />
				</>
			)}
			{selectedBooks.length > 0 && (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 3 }}>
					<Button onClick={handleSubmitLoans} variant="contained" color="primary">
						Submit Loans
					</Button>
				</Box>
			)}
		</Layout>
	);
};

export default ExplorePage;
