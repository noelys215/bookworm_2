/* eslint-disable react/prop-types */
const SearchedBooks = ({ books, onSelectBook, selectedBooks }) => {
	return (
		<div>
			<h3>Searched Books</h3>
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
		</div>
	);
};

export default SearchedBooks;
