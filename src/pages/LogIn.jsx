import { AccountMessage } from '../components/AccountMessage'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function LogIn() {
	const { logIn } = useAuth()
	const {
		userNameEmail,
		userNameEmailError,
		handleChangeUsernameEmail,
		handleUsernameEmailBlur,
		password,
		passwordError,
		handleChangePassword,
		handleSubmit,
		formError,
		handlePasswordBlur
	} = logIn()
	return (
		<div className="mb-28 flex-grow space-y-6 pt-16">
			<AccountMessage
				title="Welcome to Platzi Store"
				description="Don't have an account?"
				linkTo="/signup"
				linkText="Sign Up"
			/>

			<form
				onSubmit={handleSubmit}
				className="mx-auto flex max-w-md flex-col space-y-4 rounded-lg border px-8 py-10 shadow-lg"
			>
				<Input
					name="usernameOrEmail"
					id="usernameOrEmail"
					label="Your Username or Email:"
					type="text"
					placeholder="Enter your username or email"
					value={userNameEmail}
					onBlur={handleUsernameEmailBlur}
					onChange={handleChangeUsernameEmail}
					messageError={userNameEmailError}
					required
				/>

				<Input
					name="password"
					id="password"
					label="Your Password:"
					type="password"
					placeholder="••••••••••••••••••"
					value={password}
					onBlur={handlePasswordBlur}
					onChange={handleChangePassword}
					messageError={passwordError}
					required
				/>

				<Button>Logn in</Button>
				{formError && <p className="text-red-500">{formError}</p>}
			</form>
		</div>
	)
}
