import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/index'
import getProducts from '../api/index.js'
import Card from '../components/Card.jsx'

export default function Home() {
	const { products } = getProducts()

	const { favoritos, setSelectedProduct, toggleFavorites } =
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
	const isFavorite = (product) => {
		return favoritos.some((item) => item.id === product.id)
	}
	return (
		<div>
			<section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
				{products.map((product) => (
					<Card
						key={product.id}
						{...product}
						handleProduct={() => handleProduct(product)}
						toggledFavorites={(e) => toggledFavorites(e, product)}
						isFavorite={isFavorite(product)}
					/>
				))}
			</section>
		</div>
	)
}
