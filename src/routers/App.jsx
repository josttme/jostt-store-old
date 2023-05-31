import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Home from '../pages/Home'
import Product from '../pages/Product'
import ProductProvider from '../context'
import Layout from '../layout/Layout'
import Cart from '../pages/Cart'
import Favorites from '../pages/Favorites'
import NotFound from '../pages/NotFound'
import Categories from '../pages/Categories'

const client = new ApolloClient({
	uri: 'https://api.escuelajs.co/graphql',
	cache: new InMemoryCache()
})

export default function App() {
	return (
		<ApolloProvider client={client}>
			<ProductProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/product/:id" element={<Product />} />
							<Route path="/category/:id" element={<Categories />} />
							<Route path="/favorites" element={<Favorites />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ProductProvider>
		</ApolloProvider>
	)
}
