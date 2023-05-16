import { PropTypes } from 'prop-types'
import { useContext } from 'react'
import { ProductContext } from '../context'

export default function Cart() {
	const { cart, total } = useContext(ProductContext)
	console.log(total)

	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<header className="text-center">
						<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
							{`Carrito(${cart.length})`}
						</h1>
					</header>
					<div className="mt-8">
						<ul className="space-y-4">
							{cart.map((product) => (
								<CartProduct key={product.id} {...product} />
							))}
						</ul>
						<div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
							<div className="w-screen max-w-lg space-y-4">
								<span className="">Total: {`$${total}`}</span>

								<div className="flex justify-end">
									<a
										href="#"
										className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
									>
										Checkout
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export function CartProduct({ title, price, image, quantity }) {
	return (
		<li className="flex items-center gap-4">
			<img
				src={image}
				alt={title}
				className="h-16 w-16 rounded object-cover"
			/>
			<div>
				<h3 className="text-sm text-gray-900">{title}</h3>
				<span>{`$${price}`}</span>
			</div>
			<div className="flex flex-1 items-center justify-end gap-2">
				<div>
					<label htmlFor="Quantity" className="sr-only">
						{' '}
						Quantity{' '}
					</label>

					<div className="flex items-center rounded border border-gray-200">
						<button
							type="button"
							className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
						>
							&minus;
						</button>

						<span>{quantity}</span>

						<button
							type="button"
							className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
						>
							&plus;
						</button>
					</div>
				</div>

				<button className="text-gray-600 transition hover:text-red-600">
					<span className="sr-only">Remove item</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="h-4 w-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>
				</button>
			</div>
		</li>
	)
}
CartProduct.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	quantity: PropTypes.number.isRequired
}
