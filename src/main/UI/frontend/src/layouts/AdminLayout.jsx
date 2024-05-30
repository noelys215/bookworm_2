/* eslint-disable react/prop-types */
import { useState } from 'react';

const AdminLayout = ({ title, children }) => {
	const [view, setView] = useState('monthly');

	const handleViewChange = (newView) => {
		setView(newView);
	};

	return (
		<div>
			<nav>
				<button onClick={() => handleViewChange('monthly')}>Monthly Report</button>
				<button onClick={() => handleViewChange('activeLoans')}>Active Loans</button>
			</nav>
			<h1>{title}</h1>
			{view === 'monthly' && children[0]}
			{view === 'activeLoans' && children[1]}
		</div>
	);
};

export default AdminLayout;
