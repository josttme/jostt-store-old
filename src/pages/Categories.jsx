import { useContext } from 'react'
import Card from '../components/Card'
import { useCategoryProducts } from '../hooks/useCategories'
import { ProductContext } from '../context'
import { useNavigate, useParams } from 'react-router-dom'
import { Skeleton } from '../components/Skeleton'

export default function Categories() {
	const { id } = useParams()
	const categoryId = parseInt(id.split('-')[1], 10)
	const { loading, products } = useCategoryProducts({ categoryId })
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

	return (
		<div>
			<section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 py-11 md:grid-cols-3">
				{loading ? (
					<Skeleton />
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
