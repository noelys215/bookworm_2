/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

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
			<h3>All Books</h3>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<ul>
				{books.map((book) => (
					<li key={book.id}>
						<p>Title: {book.title}</p>
						<p>Author: {book.author}</p>
						<p>Year: {book.year}</p>
						<p>Genre: {book.genre}</p>
						<p>ISBN: {book.isbn}</p>
						<p>Quantity Available: {book.quantity}</p>
						<label>
							<input
								type="checkbox"
								checked={selectedBooks.includes(book.id)}
								onChange={() => onSelectBook(book.id)}
							/>
							Select for loan
						</label>
					</li>
				))}
			</ul>
			<button onClick={handlePreviousPage} disabled={page === 0}>
				Previous
			</button>
			<button onClick={handleNextPage}>Next</button>
		</div>
	);
};

export default Books;
