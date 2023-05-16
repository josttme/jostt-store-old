import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../pages/Product'
import ProductProvider from '../context'
import Layout from '../layout/Layout'
import Cart from '../pages/Cart'

export default function App() {
	return (
		<ProductProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
						<Route path="/cart" element={<Cart />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ProductProvider>
	)
}
