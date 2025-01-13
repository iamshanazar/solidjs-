// src/components/MainLayout.tsx
import { Component, JSX } from 'solid-js';
import { Header } from '../components/ui/Header';

const MainLayout: Component<{ children: JSX.Element }> = props => {
	return (
		<div>
			<header>
				<Header />
			</header>
			<main>{props.children}</main>
		</div>
	);
};

export default MainLayout;
