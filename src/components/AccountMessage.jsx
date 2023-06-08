import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

export function AccountMessage({ title, description, linkTo, linkText }) {
	return (
		<>
			<h2 className="text-center text-2xl font-bold">{title}</h2>
			<p className="text-center text-lg text-gray-500">
				{description} &nbsp;
				<Link
					to={linkTo}
					className="  text-blue-500 underline hover:text-blue-700"
				>
					{linkText}
				</Link>
			</p>
		</>
	)
}
AccountMessage.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	linkTo: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired
}
