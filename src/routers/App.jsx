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
import { PrivateRoute } from '../pages/PrivateRoute'
import { LogIn } from '../pages/LogIn'
import { SignUp } from '../pages/SignUp'

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
							<Route path="/product/:id" element={<Product />} />
							<Route path="/category/:id" element={<Categories />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/login" element={<LogIn />} />
							<Route
								path="/favorites"
								element={<PrivateRoute route={<Favorites />} />}
							/>
							<Route path="/cart" element={<PrivateRoute route={<Cart />} />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ProductProvider>
		</ApolloProvider>
	)
}
