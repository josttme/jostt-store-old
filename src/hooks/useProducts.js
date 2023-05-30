import { useCallback, useRef, useState } from 'react'
import { searchProducts, getProducts } from '../services/products'

export function useProducts(options = {}) {
	const [products, setProducts] = useState([])
	const [productsSearch, setProductsSearch] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const previousOptions = useRef(options)

	const fetchProducts = useCallback(async (options = {}) => {
		const { search, fetchFunction } = options
		if (search === previousOptions.current.search && search !== undefined) {
			return
		}
		try {
			setLoading(true)
			setError(null)
			previousOptions.current = options

			if (fetchFunction === 'searchProducts') {
				const newProducts = await searchProducts({ search })
				setProductsSearch(newProducts)
			} else if (fetchFunction === 'getProducts') {
				const newProducts = await getProducts()
				setProducts(newProducts)
			}
		} catch (e) {
			setError(e.message)
		} finally {
			setLoading(false)
		}
	}, [])
	productsSearch || setProductsSearch([])

	return { products, productsSearch, fetchProducts, loading, error }
}
