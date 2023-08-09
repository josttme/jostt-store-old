import { useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

/* export const useCart = (key) => {
	const [cartItems, setCartItems] = useLocalStorage(key)

	const addToCart = (product) => {
		setCartItems([...cartItems, product])
	}

	const removeFromCart = (product) => {
		const updatedCartItems = cartItems.filter((item) => item.id !== product.id)
		setCartItems(updatedCartItems)
	}

	return [cartItems, addToCart, removeFromCart]
} */

export const useCart = (key, currentUser) => {
	const [cartItems, setCartItems] = useLocalStorage(key)

	// Utilizamos useState para mantener el valor actualizado de currentAccountCartItems
	const [currentAccountCartItems, setCurrentAccountCartItems] = useState([])
	console.log(currentUser)
	useEffect(() => {
		const findUserByUsername = (username) =>
			cartItems.find((user) => user.username === username)
		const currentAccount = findUserByUsername(currentUser)
		const cart = currentAccount?.cart
		console.log(currentAccount)
		setCurrentAccountCartItems(cart || [])

		console.log(currentAccountCartItems)
	}, [cartItems, currentUser])

	const addToCart = (product) => {
		const existingItem = currentAccountCartItems?.find(
			(item) => item?.id === product.id
		)

		if (existingItem) {
			const updatedCartItems = currentAccountCartItems.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity + 1 }
				}
				return item
			})
			updateCartItems(currentUser, updatedCartItems)
		} else {
			const newCartItems = [
				...currentAccountCartItems,
				{ ...product, quantity: 1 }
			]
			updateCartItems(currentUser, newCartItems)
		}
	}
	const updateCartItems = (username, newCartItems) => {
		const updatedCartUsers = cartItems.map((user) =>
			user.username === username ? { ...user, cart: newCartItems } : user
		)
		setCartItems(updatedCartUsers)
	}
	const removeFromCart = (product) => {
		const updatedCartItems = currentAccountCartItems.filter(
			(item) => item.id !== product.id
		)
		/* 	setCartItems(updatedCartItems) */
		updateCartItems(currentUser, updatedCartItems)
	}

	const increaseQuantity = (product) => {
		const updatedCartItems = currentAccountCartItems.map((item) => {
			if (item.id === product.id) {
				return { ...item, quantity: item.quantity + 1 }
			}
			return item
		})
		updateCartItems(currentUser, updatedCartItems)

		/* setCartItems(updatedCartItems) */
	}

	const decreaseQuantity = (product) => {
		const updatedCartItems = currentAccountCartItems.map((item) => {
			if (item.id === product.id && item.quantity > 1) {
				return { ...item, quantity: item.quantity - 1 }
			}
			return item
		})
		/* 	setCartItems(updatedCartItems) */
		updateCartItems(currentUser, updatedCartItems)
	}

	return [
		currentAccountCartItems,
		addToCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity
	]
}
