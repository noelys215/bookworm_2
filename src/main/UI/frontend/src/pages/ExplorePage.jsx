import { useState } from 'react';
import axios from '../utils/axiosConfig.js';
import Books from '../components/Books.jsx';
import SearchedBooks from '../components/SearchedBooks.jsx';
import BackToDashboardButton from '../components/BackToDashboardButton.jsx';

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
		<div>
			<h2>Explore Books</h2>
			<BackToDashboardButton />
			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search by title, author, or genre"
				/>
				<button type="submit">Search</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{searchResults.length > 0 ? (
				<SearchedBooks
					books={searchResults}
					onSelectBook={handleSelectBook}
					selectedBooks={selectedBooks}
				/>
			) : (
				<>
					{searchQuery && <p>No Books Found, Try Again</p>}
					<Books onSelectBook={handleSelectBook} selectedBooks={selectedBooks} />
				</>
			)}
			{selectedBooks.length > 0 && <button onClick={handleSubmitLoans}>Submit Loans</button>}
		</div>
	);
};

export default ExplorePage;
