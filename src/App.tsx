// src/App.tsx
import { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';

// import { AuthProvider } from './context/AuthContext'; // Ensure this import path is correct
import { AuthProvider } from './pages/Auth/AuthContext';
import ProtectedRoute from './pages/Auth/Protected';
import Login from './pages/Auth';
import Cashes from './pages/Cashes';
import Item from './pages/Cashes/item';
import MainLayout from './Layout/MainLayout';
import Ranges from './pages/Ranges';

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
				<Route
					path='/ranges'
					component={() => (
						<ProtectedRoute>
							<MainLayout>
								<Ranges />
							</MainLayout>
						</ProtectedRoute>
					)}
				/>
			</Router>
		</AuthProvider>
	);
};

export default App;
