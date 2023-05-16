import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/index'
import getProducts from '../api/index.js'
import Card from '../components/Card.jsx'

export default function Home() {
	const { products } = getProducts()

	const { setSelectedProduct } = useContext(ProductContext)

	const navigate = useNavigate()

	const handleProduct = (product) => {
		setSelectedProduct(product)
		navigate(`/product/${product.id}`)
	}

	return (
		<div>
			<section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
				{products.map((product) => (
					<Card
						key={product.id}
						{...product}
						handleProduct={() => handleProduct(product)}
					/>
				))}
			</section>
		</div>
	)
}
