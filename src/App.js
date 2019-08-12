import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	let localCart = localStorage.getItem('cart');
	localCart = localCart ? JSON.parse(localCart) : null;
	const [cart, setCart] = useState(localCart || []);

	const addItem = item => {
		let newCart = [...cart, item];
		setCart(newCart);
		localStorage.setItem('cart', JSON.stringify(newCart));
	};

	const delItem = id => {
		let filteredCart = cart.filter(i => i.id !== id);
		setCart(filteredCart);
		localStorage.setItem('cart', JSON.stringify(filteredCart));
	};

	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem, delItem }}>
				<CartContext.Provider value={cart}>
					<Navigation />

					{/* Routes */}
					<Route exact path="/" component={Products} />

					<Route path="/cart" component={ShoppingCart} />
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
