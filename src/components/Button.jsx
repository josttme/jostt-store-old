import { PropTypes } from 'prop-types'

export function Button({ children }) {
	return (
		<button
			type="submit"
			className="self-end rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
		>
			{children}
		</button>
	)
}
Button.propTypes = {
	children: PropTypes.node.isRequired
}
