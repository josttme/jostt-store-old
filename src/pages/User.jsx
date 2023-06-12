import { useContext } from 'react'
import { ProductContext } from '../context'

export function User() {
	const { account, setIsAuth, setAccount, setFavorites, setAccountData } =
		useContext(ProductContext)

	const handleLogout = () => {
		setIsAuth(false)
		sessionStorage.removeItem('currentCount')
		setAccount('')
		setFavorites([])
		setAccountData({})
	}

	const handleDeleteUser = () => {
		const users = JSON.parse(localStorage.getItem('accountsStore')) || []
		const updatedUsers = users.filter((user) => user.username !== account)
		localStorage.setItem('accountsStore', JSON.stringify(updatedUsers))
		setIsAuth(false)
		sessionStorage.removeItem('currentCount')
		setAccount('')
		setFavorites([])
		setAccountData({})
	}

	return (
		<section className="flex flex-grow flex-col items-center  gap-2 pt-5">
			<h2 className="py-5 text-center text-2xl font-bold lg:text-3xl">
				Hola! {account}
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
