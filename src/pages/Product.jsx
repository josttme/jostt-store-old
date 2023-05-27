import React, { useContext } from 'react'
import { ProductContext } from '../context'
import { Link } from 'react-router-dom'

export default function Product() {
	const { selectedProduct, addToCart, isFavorite, toggleFavorites } =
		useContext(ProductContext)
	const { title, description, price, image } = selectedProduct

	const isFavorited = isFavorite(selectedProduct)
	const favorite = isFavorited ? 'fill-red-600 stroke-red-600' : 'fill-none'
	return (
		<section className="mx-auto mt-28 grid max-w-6xl grid-cols-2 gap-4 overflow-hidden  rounded-lg  bg-white shadow-lg">
			<figure className="grid h-[570px] w-[570px] place-content-center shadow-lg">
				<img src={image} alt={title} width={1000} height={1000} />
			</figure>
			<div className="flex flex-col gap-5 px-5 py-11 ">
				<h1 className="text-3xl">{title}</h1>
				<p className="text-lg">{description}</p>
				<p className="text-4xl">{`$${price}`}</p>
				<div className="flex gap-4">
					<Link to="/cart">
						<button
							onClick={() => addToCart(selectedProduct)}
							className="w-60 rounded-lg  bg-blue-500 p-3 text-white duration-150 hover:bg-blue-600"
						>
							Agregar al carrito
						</button>
					</Link>
					<button
						type="button"
						onClick={() => toggleFavorites(selectedProduct)}
						className="grid h-12 w-12 place-content-center rounded-full bg-slate-200 stroke-black p-2 shadow-sm transition duration-300 hover:stroke-[red]"
					>
						<svg
							className={`${favorite} h-6 w-6`}
							strokeWidth="2.1"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z"
								strokeWidth="2.1"
								strokeLinejoin="round"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</section>
	)
}
