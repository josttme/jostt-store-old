import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/index'
import Card from '../components/Card.jsx'
import { useProducts } from '../hooks/useProducts'
import { useSearch } from '../hooks/useSearch'
import { Search } from '../components/Search'

export default function Home() {
	const [search, updateSearch, error] = useSearch()
	const {
		productsSearch,
		fetchProducts: fetchSearchProducts,
		loading: searchLoading
	} = useProducts({
		search,
		fetchFunction: 'searchProducts'
	})
	const {
		products,
		fetchProducts,
		loading: allLoading
	} = useProducts({
		fetchFunction: 'getProducts'
	})

	const { isFavorite, setSelectedProduct, toggleFavorites } =
		useContext(ProductContext)
	const navigate = useNavigate()

	const handleProduct = (product) => {
		setSelectedProduct(product)
		navigate(`/product/${product.id}`)
	}

	const toggledFavorites = (e, product) => {
		e.stopPropagation()
		toggleFavorites(product)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		fetchSearchProducts({
			search,
			fetchFunction: 'searchProducts'
		})
	}

	useEffect(() => {
		if (search === '') {
			fetchProducts({
				fetchFunction: 'getProducts'
			})
		}
	}, [fetchProducts, search])

	return (
		<div>
			<Search
				search={search}
				updateSearch={updateSearch}
				error={error}
				handleSubmit={handleSubmit}
				getProducts={fetchSearchProducts}
			/>
			<section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 py-11 md:grid-cols-3">
				{searchLoading || allLoading ? (
					<p>Loading...</p>
				) : search ? (
					productsSearch.map((product) => (
						<Card
							key={product.id}
							{...product}
							handleProduct={() => handleProduct(product)}
							toggledFavorites={(e) => toggledFavorites(e, product)}
							isFavorite={isFavorite(product)}
						/>
					))
				) : (
					products.map((product) => (
						<Card
							key={product.id}
							{...product}
							handleProduct={() => handleProduct(product)}
							toggledFavorites={(e) => toggledFavorites(e, product)}
							isFavorite={isFavorite(product)}
						/>
					))
				)}
			</section>
		</div>
	)
}
