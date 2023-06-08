import { PropTypes } from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import { useFavotites } from '../hooks/useFavorites'
import { useCart } from '../hooks/useCart'

export const ProductContext = createContext()

export default function ProductProvider({ children }) {
	const [account, setAccount] = useState(() => {
		return sessionStorage.getItem('currentCount')
	})
	const [isAuth, setIsAuth] = useState(() => {
		return !!sessionStorage.getItem('currentCount')
	})
	const [products, setProducts] = useState([])
	const [selectedProduct, setSelectedProduct] = useState([])
	const [quantityProducts, setQuantityProducts] = useState(0)

	const [favoritos, toggleFavorites] = useFavotites('store_favorites')
	const [
		cartItems,
		addToCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity
	] = useCart('store_cart')

	const isFavorite = (product) => {
		return favoritos.some((item) => item.id === product.id)
	}
	useEffect(() => {
		// Suma el total de la cantidad de productos en el carrito
		setQuantityProducts(
			cartItems.reduce((setQuantityProducts, item) => {
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
		favoritos,
		toggleFavorites,
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
		account
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
