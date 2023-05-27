import PropTypes from 'prop-types'

export default function Card({
	title,
	price,
	image,
	handleProduct,
	toggledFavorites,
	isFavorite
}) {
	const favorite = isFavorite ? 'fill-red-600 stroke-red-600' : 'fill-none'
	return (
		<div
			onClick={handleProduct}
			className="max-w-sm cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl transition duration-300 hover:shadow-4xl"
		>
			<figure className="relative w-full">
				<div className="absolute right-2 top-2">
					<button
						type="button"
						onClick={toggledFavorites}
						className="grid h-8 w-8 place-content-center rounded-full bg-slate-100 stroke-black p-2 transition duration-300 hover:stroke-[red]"
					>
						<svg
							className={`${favorite} h-5 w-5`}
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
				<img
					className="h-full w-full"
					src={image}
					alt={title}
					width="200"
					height="200"
				/>
				<span className="absolute bottom-0 left-0 m-2 rounded-lg bg-white/60 px-3 py-0.5 text-xs text-black">
					Electronics
				</span>
			</figure>
			<div className="p-5">
				<h1 className="text-xl ">{title}</h1>
				<p className="text-2xl ">{`$${price}`}</p>
			</div>
		</div>
	)
}
Card.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	handleProduct: PropTypes.func.isRequired,
	toggledFavorites: PropTypes.func.isRequired,
	isFavorite: PropTypes.bool.isRequired
}
