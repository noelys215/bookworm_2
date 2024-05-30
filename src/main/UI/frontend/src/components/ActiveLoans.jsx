import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { format, differenceInDays } from 'date-fns';

const ActiveLoans = () => {
	const [loans, setLoans] = useState([]);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		fetchLoans();
	}, []);

	const fetchLoans = async () => {
		try {
			const response = await axios.get('/api/loans/active');
			const loansWithOverdue = response.data.map((loan) => ({
				...loan,
				overdue:
					!loan.returnDate && differenceInDays(new Date(), new Date(loan.loanDate)) > 14,
			}));
			setLoans(loansWithOverdue);
		} catch (error) {
			console.error('Failed to fetch loans:', error);
		}
	};

	const deleteLoan = async (loanId) => {
		const confirmed = window.confirm('Are you sure you want to delete this loan?');
		if (confirmed) {
			try {
				await axios.delete(`/api/loans/${loanId}`);
				setLoans(loans.filter((loan) => loan.id !== loanId));
			} catch (error) {
				console.error('Failed to delete loan:', error);
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

	return (
		<div>
			<h2>Active Loans</h2>
			<div>
				<label>
					<input
						type="radio"
						value="all"
						checked={filter === 'all'}
						onChange={() => setFilter('all')}
					/>
					All
				</label>
				<label>
					<input
						type="radio"
						value="overdue"
						checked={filter === 'overdue'}
						onChange={() => setFilter('overdue')}
					/>
					Overdue
				</label>
				<label>
					<input
						type="radio"
						value="lost"
						checked={filter === 'lost'}
						onChange={() => setFilter('lost')}
					/>
					Lost
				</label>
			</div>
			<ul>
				{filteredLoans.map((loan) => (
					<li key={loan.id}>
						<p>
							<strong>Book Title:</strong> {loan.book.title}
						</p>
						<p>
							<strong>Author:</strong> {loan.book.author}
						</p>
						<p>
							<strong>ISBN:</strong> {loan.book.isbn}
						</p>
						<p>
							<strong>Genre:</strong> {loan.book.genre}
						</p>
						<p>
							<strong>Year:</strong> {loan.book.year}
						</p>
						<p>
							<strong>User:</strong> {loan.user.name} ({loan.user.email})
						</p>
						<p>
							<strong>Loan Date:</strong>{' '}
							{format(new Date(loan.loanDate), 'MMMM dd, yyyy')}
						</p>
						<p>
							<strong>Return Date:</strong>{' '}
							{loan.returnDate
								? format(new Date(loan.returnDate), 'MMMM dd, yyyy')
								: 'Not returned yet'}
						</p>
						<p>
							<strong>Lost:</strong> {loan.lost ? 'Yes' : 'No'}
						</p>
						{loan.lost && loan.lostDate && (
							<p>
								<strong>Lost Date:</strong>{' '}
								{format(new Date(loan.lostDate), 'MMMM dd, yyyy')}
							</p>
						)}
						<p>
							<strong>Overdue:</strong> {loan.overdue ? 'Yes' : 'No'}
						</p>
						<button onClick={() => deleteLoan(loan.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ActiveLoans;
