import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ProductContext } from '../context'

export default function Header() {
	const { cart } = useContext(ProductContext)
	const isActive = ({ isActive }) => isActive && 'text-green-500'
	return (
		<div className="flex h-16 w-full justify-between">
			<div className="flex items-center gap-4 pl-6">
				<NavLink
					to="/"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					logo
				</NavLink>
				<NavLink
					to="/all"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					All
				</NavLink>
				<NavLink
					to="/clothes"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					Clothes
				</NavLink>
				<NavLink
					to="/electronics"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					Electronics
				</NavLink>
				<NavLink
					to="/furnitures"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					Furnitures
				</NavLink>
				<NavLink
					to="/toys"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					Toys
				</NavLink>
				<NavLink
					to="/others"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					Others
				</NavLink>
			</div>
			<div className="flex items-center gap-4 pr-6">
				<span>josue@jostt.me</span>
				<NavLink
					to="/my-orders"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					My orders
				</NavLink>
				<NavLink
					to="/my-account"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					My account
				</NavLink>
				<NavLink
					to="/favorites"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					Favorites
				</NavLink>
				<NavLink
					to="/sign-out"
					className={`${isActive} decoration-2 underline-offset-2 hover:underline`}
				>
					Sign out
				</NavLink>
				<Link to="/cart">
					<div className="flex ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.7}
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
						<span>{cart?.length}</span>
					</div>
				</Link>
			</div>
		</div>
	)
}
