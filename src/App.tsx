// src/App.tsx
import { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import Login from './pages/Auth';
import Home from './pages/Home';
import MainLayout from './pages/Layout/MainLayout';

const App: Component = () => {
	return (
		<>
			<Router root={MainLayout}>
				<Route path='/login' component={Login} />
				<Route component={Home} />
			</Router>
		</>
	);
};

export default App;
