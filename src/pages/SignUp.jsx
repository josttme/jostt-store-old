import { AccountMessage } from '../components/AccountMessage'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function SignUp() {
	const { signUp } = useAuth()
	const {
		username,
		email,
		password,
		usernameError,
		emailError,
		passwordError,
		formError,
		handleChangeUsername,
		handleChangeEmail,
		handleChangePassword,
		handleSubmit,
		handleUsernameBlur,
		handleEmailBlur,
		handlePasswordBlur
	} = signUp()

	return (
		<section className="mb-28 flex-grow space-y-6 pt-16">
			<AccountMessage
				title="Create an Account"
				description="Already have an account?"
				linkTo="/login"
				linkText="Login"
			/>

			<form
				onSubmit={handleSubmit}
				className="mx-auto flex max-w-md flex-col space-y-4 rounded-lg border px-8 py-10 shadow-lg"
			>
				<Input
					name="username"
					id="username"
					label="Your Username:"
					type="text"
					placeholder="Enter your username"
					value={username}
					onBlur={handleUsernameBlur}
					onChange={handleChangeUsername}
					messageError={usernameError}
					required
				/>

				<Input
					name="email"
					id="email"
					label="Your Email:"
					type="email"
					placeholder="youremail@domain.com"
					value={email}
					onBlur={handleEmailBlur}
					onChange={handleChangeEmail}
					messageError={emailError}
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

				<Button>Sign Up</Button>

				{formError && <p className="text-red-500">{formError}</p>}
			</form>
		</section>
	)
}
