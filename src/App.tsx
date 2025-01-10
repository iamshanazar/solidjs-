import { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';

import { AuthProvider } from './pages/Auth/AuthContext';
import ProtectedRoute from './pages/Auth/Protected';
import Login from './pages/Auth';
import Cashes from './pages/Cahses/index';
import Item from './pages/Cahses/item';
import MainLayout from './pages/Layout/MainLayout';

const App: Component = () => {
	return (
		<AuthProvider>
			<Router>
				{/* Public route */}
				<Route path='/login' component={Login} />

				{/* Protected routes */}
				<Route
					path='/cashes'
					component={() => (
						<ProtectedRoute>
							<MainLayout>
								<Cashes />
							</MainLayout>
						</ProtectedRoute>
					)}
				/>
				<Route
					path='/cashes/:id'
					component={() => (
						<ProtectedRoute>
							<MainLayout>
								<Item />
							</MainLayout>
						</ProtectedRoute>
					)}
				/>
			</Router>
		</AuthProvider>
	);
};

export default App;
