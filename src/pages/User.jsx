import { useContext } from 'react'
import { ProductContext } from '../context'

export function User() {
	const { currentUser, setCurrentUser, setIsAuth, accounts, setAccounts } =
		useContext(ProductContext)

	const handleLogout = () => {
		setIsAuth(false)
		setCurrentUser('')
		sessionStorage.removeItem('currentCount')
	}

	const handleDeleteUser = () => {
		const updatedUsers = accounts.filter(
			(user) => user.username !== currentUser
		)
		console.log(updatedUsers)
		setAccounts(updatedUsers)
		setIsAuth(false)
		setCurrentUser('')
		sessionStorage.removeItem('currentCount')
	}

	return (
		<section className="flex flex-grow flex-col items-center  gap-2 pt-5">
			<h2 className="py-5 text-center text-2xl font-bold lg:text-3xl">
				Hola! {currentUser}
			</h2>
			<button
				type="button"
				onClick={handleLogout}
				className="text-md block rounded bg-gray-700 px-5 py-3 text-gray-100 transition hover:bg-gray-600 "
			>
				Cerrar Sesión
			</button>
			<button
				type="button"
				onClick={handleDeleteUser}
				className="text-md mt-3 block rounded bg-red-700 px-5 py-3 text-gray-100 transition hover:bg-red-600 "
			>
				Eliminar Usuario
			</button>
		</section>
	)
}
