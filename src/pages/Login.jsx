import { AccountMessage } from '../components/AccountMessage'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function Login() {
	return (
		<div className="mb-28 flex-grow space-y-6 pt-16">
			<AccountMessage
				title="Welcome to Platzi Store"
				description="Don't have an account?"
				linkTo="/signup"
				linkText="Sign Up"
			/>

			<form className="mx-auto flex max-w-md flex-col space-y-4 rounded-lg border px-8 py-10 shadow-lg">
				<Input
					name="usernameOrEmail"
					id="usernameOrEmail"
					label="Your Username or Email:"
					type="text"
					placeholder="Enter your username or email"
				/>
				<Input
					name="password"
					id="password"
					label="Your Password:"
					type="password"
					placeholder="••••••••••••••••••"
				/>

				<Button>Logn in</Button>
			</form>
		</div>
	)
}
