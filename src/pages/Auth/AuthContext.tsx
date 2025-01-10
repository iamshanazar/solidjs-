// src/context/AuthContext.tsx
import { createSignal, createContext, useContext, ParentProps } from 'solid-js';

type AuthContextType = {
	isAuthenticated: () => boolean;
	login: (token: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: ParentProps) {
	const [isAuthenticated, setIsAuthenticated] = createSignal(
		!!localStorage.getItem('access_token')
	);

	const login = (token: string) => {
		localStorage.setItem('access_token', token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem('access_token');
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
