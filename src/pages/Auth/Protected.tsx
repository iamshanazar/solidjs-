import { Component, JSX } from 'solid-js';
import { isAuthenticated } from './index';

const ProtectedRoute: Component<{ children: JSX.Element }> = props => {
	return isAuthenticated() ? props.children : <Navigate href='/login' />;
};
