import {
	createBrowserRouter,
	createRoutesFromElements,
	Outlet,
	Route,
	RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

import './App.css';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
				<Route path="/" element={<Home />} />
				<Route element={<PrivateRoute roles={['ROLE_USER', 'ROLE_ADMIN']} />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
				<Route element={<PrivateRoute roles={['ROLE_USER', 'ROLE_ADMIN']} />}>
					<Route path="/explore" element={<ExplorePage />} />
				</Route>
				<Route element={<PrivateRoute roles={['ROLE_ADMIN']} />}>
					<Route path="/admin-dashboard" element={<AdminDashboard />} />
				</Route>
			</Route>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

const Root = () => {
	return (
		<>
			<Outlet />
		</>
	);
};
