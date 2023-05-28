import React, { useContext } from 'react'
import { ProductContext } from '../context'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'

export default function Favorites() {
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
	return (
		<div className="flex-grow ">
			<div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 py-11 md:grid-cols-3">
				{favoritos.map((product) => (
					<Card
						key={product.id}
						{...product}
						handleProduct={() => handleProduct(product)}
						toggledFavorites={(e) => toggledFavorites(e, product)}
						isFavorite={true}
					/>
				))}
			</div>
		</div>
	)
}
