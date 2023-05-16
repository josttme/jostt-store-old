import { PropTypes } from 'prop-types'
import { createContext, useState } from 'react'

export const ProductContext = createContext()

export default function ProductProvider({ children }) {
	const [selectedProduct, setSelectedProduct] = useState([])
	const [cart, setCart] = useState([])
	const [total, setTotal] = useState(0)

	/* 	const [quantityProducts, setQuantityProducts] = useState(0) */

	const addToCart = (product) => {
		const existingItem = cart.find((item) => item.id === product.id)
		console.log(existingItem)
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
		/* 	setCart([...cart, product])
		sumTotal() */

		sumTotal()
	}
	const sumTotal = () => {
		setTotal(cart.reduce((acc, product) => acc + product.price, 0))
	}
	const valueContext = {
		selectedProduct,
		setSelectedProduct,
		cart,
		addToCart,
		total
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
