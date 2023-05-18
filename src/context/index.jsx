import { PropTypes } from 'prop-types'
import { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext()

export default function ProductProvider({ children }) {
	const [selectedProduct, setSelectedProduct] = useState([])
	const [cart, setCart] = useState([])
	const [total, setTotal] = useState(0)

	const [quantityProducts, setQuantityProducts] = useState(0)

	const addToCart = (product) => {
		const existingItem = cart?.find((item) => item.id === product.id)
		if (existingItem) {
			const updatedItems = cart.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity + 1 }
				}
				return item
			})

			setCart(updatedItems)
		} else {
			const newItem = { ...product, quantity: 1 }
			setCart([...cart, newItem])
		}
	}
	useEffect(() => {
		sumQuantityProducts()
		sumTotal()
	}, [cart])

	const sumTotal = () => {
		const subtotals = cart.map(
			(product) => product.price * product.quantity
		)
		const total = subtotals.reduce(
			(acc, subtotal) => acc + subtotal,
			0
		)
		setTotal(total)
	}

	const sumQuantityProducts = () => {
		const quantityProducts = cart.reduce(
			(total, product) => total + product.quantity,
			0
		)
		setQuantityProducts(quantityProducts)
	}
	const removeProduct = (id) => {
		const updatedCart = cart.filter((product) => product.id !== id)
		setCart(updatedCart)
		console.log(updatedCart)
	}

	const valueContext = {
		selectedProduct,
		setSelectedProduct,
		cart,
		setCart,
		addToCart,
		sumTotal,
		total,
		quantityProducts,
		removeProduct
	}

	/* prettier-ignore */
	return (
		<ProductContext.Provider value={valueContext}>
			{children}
		</ProductContext.Provider>
	)
}

ProductProvider.propTypes = {
	children: PropTypes.node.isRequired
}
