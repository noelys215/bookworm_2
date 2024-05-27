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

import './App.css';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
				<Route path="/" element={<Home />} />
				{/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
				<Route path="/dashboard" element={<Dashboard />} /> */}
				<Route element={<PrivateRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/explore" element={<ExplorePage />} />
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
