import {
	createBrowserRouter,
	createRoutesFromElements,
	Outlet,
	Route,
	RouterProvider,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';

import './App.css';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
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
