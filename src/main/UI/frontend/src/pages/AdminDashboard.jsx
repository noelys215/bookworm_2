import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import MonthlyReport from '../components/MonthlyReport.jsx';
import ActiveLoans from '../components/ActiveLoans.jsx';
import UserManagement from '../components/UserManagement.jsx';
import Layout from '../layouts/Layout.jsx';

const AdminDashboard = () => {
	const [view, setView] = useState(
		() => localStorage.getItem('adminDashboardTab') || 'monthlyReport'
	);

	const handleTabChange = (event, newValue) => {
		setView(newValue);
		localStorage.setItem('adminDashboardTab', newValue);
	};

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
		<Layout title={'Admin Dashboard'}>
			<Box sx={{ width: '100%' }}>
				<Tabs
					value={view}
					onChange={handleTabChange}
					variant="fullWidth"
					indicatorColor="primary"
					textColor="primary">
					<Tab label="Monthly Report" value="monthlyReport" />
					<Tab label="Active Loans" value="activeLoans" />
					<Tab label="User Management" value="userManagement" />
				</Tabs>
			</Box>
			<Box sx={{ mt: 2 }}>{renderView()}</Box>
		</Layout>
	);
};

export default AdminDashboard;
