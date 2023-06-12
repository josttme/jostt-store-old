import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/index.jsx'
import Card from '../components/Card.jsx'
import { useSearch } from '../hooks/useSearch'
import { Search } from '../components/Search'
import { useListOfProducts } from '../hooks/useListOfProducts.js'
import { useProductSearch } from '../hooks/useProducts.js'
import { Skeleton } from '../components/Skeleton.jsx'

export default function Home() {
	const [search, updateSearch, error] = useSearch()
	const { products, loading } = useListOfProducts()

	const { productsSearch, fetchProductSearch, loadingSearch } =
		useProductSearch({ search })

	const { isFavorite, setSelectedProduct, toggleFavorite } =
		useContext(ProductContext)

	const navigate = useNavigate()

	const handleProduct = (product) => {
		setSelectedProduct(product)
		navigate(`/product/${product.id}`)
	}

	const toggledFavorites = (e, product) => {
		e.stopPropagation()
		toggleFavorite(product)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		fetchProductSearch({ search })
	}
	return (
		<div>
			<Search
				search={search}
				updateSearch={updateSearch}
				error={error}
				handleSubmit={handleSubmit}
				getProducts={fetchProductSearch}
			/>

			<section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 py-11 md:grid-cols-3">
				{loadingSearch || loading ? (
					<Skeleton />
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
