import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Footer } from '../components/Footer'

export default function Layout() {
	return (
		<div className="flex min-h-[105vh] flex-col bg-gray-100">
			<Header />
			<Outlet />
			<Footer />
		</div>
	)
}
