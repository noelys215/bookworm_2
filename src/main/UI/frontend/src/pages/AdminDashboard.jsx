import { useState } from 'react';
import MonthlyReport from '../components/MonthlyReport.jsx';
import ActiveLoans from '../components/ActiveLoans.jsx';
import UserManagement from '../components/UserManagement.jsx';
import BackToDashboardButton from '../components/BackToDashboardButton.jsx';

const AdminDashboard = () => {
	const [view, setView] = useState('monthlyReport');

	const renderView = () => {
		switch (view) {
			case 'monthlyReport':
				return <MonthlyReport />;
			case 'activeLoans':
				return <ActiveLoans />;
			case 'userManagement':
				return <UserManagement />;
			default:
				return <MonthlyReport />;
		}
	};

	return (
		<div>
			<nav>
				<button onClick={() => setView('monthlyReport')}>Monthly Report</button>
				<button onClick={() => setView('activeLoans')}>Active Loans</button>
				<button onClick={() => setView('userManagement')}>User Management</button>
				<BackToDashboardButton />
			</nav>
			{renderView()}
		</div>
	);
};

export default AdminDashboard;
