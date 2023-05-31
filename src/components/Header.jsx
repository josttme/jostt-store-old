import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ProductContext } from '../context'

export default function Header() {
	const { quantityProducts } = useContext(ProductContext)
	const activeClass = 'decoration-2 underline-offset-2 underline p-1 px-2'
	const classDefault = 'rounded-md p-1 px-2 duration-150 hover:bg-gray-200'
	return (
		<div className="flex h-16 w-full justify-between">
			<div className="flex items-center gap-2 pl-6">
				<NavLink to="/" className="text-lg font-bold">
					Platzi Store
				</NavLink>
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? activeClass : classDefault)}
				>
					All
				</NavLink>
				<NavLink
					to="/category/electronics-2"
					className={({ isActive }) => (isActive ? activeClass : classDefault)}
				>
					Electronics
				</NavLink>
				<NavLink
					to="/category/clothes-4"
					className={({ isActive }) => (isActive ? activeClass : classDefault)}
				>
					Clothes
				</NavLink>
				<NavLink
					to="/category/furnitures-3"
					className={({ isActive }) => (isActive ? activeClass : classDefault)}
				>
					Furnitures
				</NavLink>
				<NavLink
					to="/category/toys-1"
					className={({ isActive }) => (isActive ? activeClass : classDefault)}
				>
					Toys
				</NavLink>
				<NavLink
					to="/category/others-5"
					className={({ isActive }) => (isActive ? activeClass : classDefault)}
				>
					Others
				</NavLink>
			</div>
			<div className="flex items-center gap-4 pr-6">
				<span>store@platzistore.com</span>
				<NavLink
					to="/favorites"
					className={({ isActive }) => (isActive ? activeClass : classDefault)}
				>
					Favorites
				</NavLink>
				<span>Sign out</span>
				<Link to="/cart" className="hover:opacity-80">
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
						<span className="h-6 w-6 rounded-full text-center">
							{quantityProducts}
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}
