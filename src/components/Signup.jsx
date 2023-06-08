import { Link } from 'react-router-dom'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function Signup() {
	return (
		<div className="mb-28 flex-grow space-y-6 pt-16">
			<h2 className="text-center text-2xl font-bold">Create an Account</h2>
			<p className="text-center text-lg text-gray-500">
				Already have an account? &nbsp;
				<Link
					to="/signup"
					className="  text-blue-500 underline hover:text-blue-700  "
					href
				>
					Logn in
				</Link>
			</p>
			<form className="mx-auto flex max-w-md flex-col space-y-4 rounded-lg border px-8 py-10 shadow-lg">
				<Input
					name="username"
					id="username"
					label="Your Username:"
					type="text"
					placeholder="Enter your username"
				/>
				<Input
					name="email"
					id="email"
					label="Your Email:"
					type="email"
					placeholder="youremail@dominio.com"
				/>
				<Input
					name="password"
					id="password"
					label="Your Password:"
					type="password"
					placeholder="••••••••••••••••••"
				/>

				<Button>Sign Up</Button>
			</form>
		</div>
	)
}
