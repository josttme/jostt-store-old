import PropTypes from 'prop-types'

export default function Card({ title, price, image, handleProduct }) {
	return (
		<div
			onClick={handleProduct}
			className="max-w-sm cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl transition duration-300 hover:shadow-2xl"
		>
			<figure className="relative w-full">
				<img className="h-full w-full" src={image} alt={title} />
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
	handleProduct: PropTypes.func.isRequired
}
