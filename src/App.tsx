import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import Login from './pages/Auth';
// Import your Home and NotFound components when they are created.

const App: Component = () => {
	return (
		<Router>
			{/* Define your routes here */}
			{/* Uncomment the Home route when Home component is ready */}
			{/* <Route path="/" component={Home} /> */}
			<Route path='/login' component={Login} />
			{/* Catch-all route for 404 handling */}
			{/* Uncomment when NotFound component is ready */}
			{/* <Route path="*" component={NotFound} /> */}
		</Router>
	);
};

export default App;
