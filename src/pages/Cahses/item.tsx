// src/pages/Cahses/item.tsx
import { Component } from 'solid-js';
import { useParams } from '@solidjs/router';

const Item: Component = () => {
	// Get the `id` parameter from the route
	const params = useParams();
	const { id } = params; // This will retrieve the `id` parameter from the URL

	return (
		<div>
			<h1>Item Detail</h1>
			<p>Item ID: {id}</p>
			{/* You can use `id` to fetch and render the specific item data */}
		</div>
	);
};

export default Item;
