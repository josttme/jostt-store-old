import { PropTypes } from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import { useFavotites } from '../hooks/useFavorites'
import { useCart } from '../hooks/useCart'

export const ProductContext = createContext({ isAuth: false })

export default function ProductProvider({ children }) {
	const [accountData, setAccountData] = useState({})
	const [account, setAccount] = useState(() => {
		const storedAccount = sessionStorage.getItem('currentCount')
		const accountWithoutQuotes = storedAccount
			? storedAccount.replace(/['"]+/g, '')
			: ''
		return accountWithoutQuotes
	})
	const [isAuth, setIsAuth] = useState(() => {
		return !!sessionStorage.getItem('currentCount')
	})
	const [products, setProducts] = useState([])
	const [selectedProduct, setSelectedProduct] = useState([])
	const [quantityProducts, setQuantityProducts] = useState(0)

	const [usersList, toggleFavorite] = useFavotites(
		'accountsStore',
		account,
		accountData
	)
	const [favorites, setFavorites] = useState(usersList)
	useEffect(() => {
		if (!account && !usersList) return
		const currentUser = usersList.find((user) => {
			return user.username === account
		})
		if (!currentUser) return

		setFavorites(currentUser.favorites)
	}, [usersList])
	const [
		cartItems,
		addToCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity
	] = useCart('accountsStore')
	const isFavorite = (product) => {
		return favorites.some((item) => item.id === product.id)
	}
	useEffect(() => {
		// Suma el total de la cantidad de productos en el carrito
		setQuantityProducts(
			cartItems?.reduce((setQuantityProducts, item) => {
				return setQuantityProducts + item.quantity
			}, 0)
		)
	}, [cartItems])

	const activeAuth = () => {
		setIsAuth(true)
	}
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
		setAccount,
		account,
		setAccountData,
		setFavorites,
		accountData
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
