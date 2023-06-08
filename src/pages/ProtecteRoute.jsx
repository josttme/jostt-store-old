import { PropTypes } from 'prop-types'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ProductContext } from '../context'

export function ProtectedRoute({ children }) {
	const { isAuth } = useContext(ProductContext)

	if (!isAuth) return <Navigate to="/login" />

	return children
}

ProtectedRoute.propTypes = {
	children: PropTypes.node
}
