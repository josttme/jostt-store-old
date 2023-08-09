import { PropTypes } from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import { useCart } from '../hooks/useCart'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useFavorites } from '../hooks/useFavorites'

export const ProductContext = createContext()

export default function ProductProvider({ children }) {
	const [accounts, setAccounts] = useLocalStorage('accountsStore')

	const [currentUser, setCurrentUser] = useState(() => {
		const storedUsername = sessionStorage.getItem('currentCount')
		const username = storedUsername ? storedUsername.replace(/['"]+/g, '') : ''
		return username
	})

	const [isAuth, setIsAuth] = useState(() => {
		return !!sessionStorage.getItem('currentCount')
	})
	const [products, setProducts] = useState([])
	const [selectedProduct, setSelectedProduct] = useState([])
	const [quantityProducts, setQuantityProducts] = useState(0)

	const [favorites, setFavorites] = useState([])

	useEffect(() => {
		if (!currentUser && !accounts) return
		const username = accounts.find((user) => {
			return user.username === currentUser
		})
		if (!username) return

		setFavorites(username.favorites)
	}, [accounts, currentUser])

	const [
		cartItems,
		addToCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity
	] = useCart('accountsStore', currentUser)
	console.log(cartItems)
	const isFavorite = (product) => {
		return favorites.some((item) => item.id === product.id)
	}
	useEffect(() => {
		// Suma el total de la cantidad de productos en el carrito
		setQuantityProducts(
			cartItems?.reduce((quantityProducts, item) => {
				console.log(item.quantity)
				return quantityProducts + item.quantity
			}, 0)
		)
	}, [cartItems])

	const activeAuth = () => {
		setIsAuth(true)
	}

	const toggleFavorite = useFavorites(accounts, setAccounts, currentUser)

	const valueContext = {
		selectedProduct,
		setSelectedProduct,
		favorites,
		toggleFavorite,
		cartItems,
		addToCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
		quantityProducts,
		isFavorite,
		products,
		setProducts,
		activeAuth,
		isAuth,
		setIsAuth,
		setCurrentUser,
		currentUser,
		setFavorites,
		accounts,
		setAccounts
	}

	return (
		<ProductContext.Provider value={valueContext}>
			{children}
		</ProductContext.Provider>
	)
}

ProductProvider.propTypes = {
	children: PropTypes.node.isRequired
}
