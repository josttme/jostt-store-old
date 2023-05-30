import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { getProducts, searchProducts } from '../services/products'
import { ProductContext } from '../context'

export function useProductSearch({ search }) {
	const [productsSearch, setProductsSearch] = useState([])
	const [searchLoading, setSearchLoading] = useState(false)
	const [error, setError] = useState(null)
	const previousSearch = useRef(search)

	const fetchProductSearch = useCallback(async ({ search }) => {
		if (search === previousSearch.current) return
		try {
			setSearchLoading(true)
			setError(null)
			previousSearch.current = search

			const newProducts = await searchProducts({ search })
			setProductsSearch(newProducts)
		} catch (e) {
			setError(e.message)
		} finally {
			setSearchLoading(false)
		}
	}, [])
	productsSearch || setProductsSearch([])

	return { productsSearch, fetchProductSearch, searchLoading, error }
}

export function useProducts() {
	const { products, setProducts } = useContext(ProductContext)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchProducts = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)

			const storedProducts = localStorage.getItem('products')

			if (storedProducts) {
				setProducts(JSON.parse(storedProducts))
			} else {
				const newProducts = await getProducts()
				setProducts(newProducts)
				localStorage.setItem('products', JSON.stringify(newProducts))
			}
		} catch (e) {
			setError(e.message)
		} finally {
			setLoading(false)
		}
	}, [setProducts])

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	return { products, fetchProducts, loading, error }
}
