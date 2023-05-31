import { useCallback, useRef, useState } from 'react'
import { searchProducts } from '../services/products'

export function useProductSearch({ search }) {
	const [productsSearch, setProductsSearch] = useState([])
	const [loadingSearch, setLoadingSearch] = useState(false)
	const [error, setError] = useState(null)
	const previousSearch = useRef(search)

	const fetchProductSearch = useCallback(async ({ search }) => {
		if (search === previousSearch.current) return
		try {
			setLoadingSearch(true)
			setError(null)
			previousSearch.current = search

			const newProducts = await searchProducts({ search })
			setProductsSearch(newProducts)
		} catch (e) {
			setError(e.message)
		} finally {
			setLoadingSearch(false)
		}
	}, [])
	productsSearch || setProductsSearch([])

	return { productsSearch, fetchProductSearch, loadingSearch, error }
}
/* 
export function useCustomProducts() {
	const [products, setProducts] = useState([])
	const { data, error, isLoading } = useProducts()

	// Puedes realizar cualquier lógica adicional aquí si es necesario

	const fetchProducts = useCallback(() => {
		try {
			setProducts(data)
		} catch (e) {
			console.log(e)
		}
	}, [setProducts])

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	return {
		products,
		error,
		isLoading
	}
}
 */
