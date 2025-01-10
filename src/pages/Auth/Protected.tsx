// src/components/ProtectedRoute.tsx
import { useAuth } from './AuthContext';
import { useNavigate } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

const ProtectedRoute: Component<{ children: JSX.Element }> = props => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	if (!isAuthenticated()) {
		navigate('/login', { replace: true });
		return null; // Prevent rendering until redirected
	}

	return <>{props.children} </>;
};

export default ProtectedRoute;
