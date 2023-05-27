import React, { useContext } from 'react'
import { ProductContext } from '../context'
import { Link } from 'react-router-dom'

export default function Product() {
	const { selectedProduct, addToCart } = useContext(ProductContext)
	const { title, description, price, image } = selectedProduct
	const addedToCart = () => {
		console.log(selectedProduct)
		addToCart(selectedProduct)
	}
	return (
		<section className="mx-auto mt-28 flex max-w-5xl gap-4 bg-slate-400">
			<figure className="grid h-[500px] w-[500px] place-content-center overflow-hidden rounded-lg bg-[#f7f6f2] shadow-lg">
				<img src={image} alt={title} />
			</figure>
			<div className="p-5">
				<h1>{title}</h1>
				<p>{description}</p>
				<p>{`$${price}`}</p>
				<Link to="/cart">
					<button
						onClick={addedToCart}
						className="w-52 rounded-lg bg-blue-500 p-2 text-white"
					>
						Agregar al carrito
					</button>
				</Link>
			</div>
		</section>
	)
}
