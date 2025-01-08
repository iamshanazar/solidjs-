// src/components/MainLayout.tsx
import { Component, JSX } from 'solid-js';
import { Header } from '../../components/ui/Header';

const MainLayout: Component<{ children: JSX.Element }> = props => {
	return (
		<div>
			<header>
				<Header />
			</header>
			<main>{props.children}</main>
			<footer>
				<p>Footer content here</p>
			</footer>
		</div>
	);
};

export default MainLayout;
