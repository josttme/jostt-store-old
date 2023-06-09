import { PropTypes } from 'prop-types'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ProductContext } from '../context'

export function PrivateRoute({ route }) {
	const { isAuth } = useContext(ProductContext)

	if (!isAuth) return <Navigate to="/login" />

	return route
}

PrivateRoute.propTypes = {
	route: PropTypes.node.isRequired
}
