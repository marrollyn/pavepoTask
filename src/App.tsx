import { lazy } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

const UsersList = lazy(() => import('./UsersList/UsersList'));
const CurrentUser = lazy(() => import('./CurrentUser/СurrentUser'));

function App() {
	return (
		<>
			<h1>Пользователи</h1>
			<Router>
				<Routes>
					<Route path="/" element={<UsersList />} />
					<Route path="/currentUser/" element={<CurrentUser />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
