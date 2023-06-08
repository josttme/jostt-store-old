import { AccountMessage } from '../components/AccountMessage'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useState } from 'react'

export function Signup() {
	const [username, setUsername] = useState('')
	const [usernameError, setUsernameError] = useState('')
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [errorForm, setErrorForm] = useState(false)

	const handleInputChange = (e, setter, regex) => {
		const value = e.target.value
			.slice(0, 30)
			.replace(/\s/g, '')
			.replace(regex, '')
		setter(value)
	}

	const handleChangeUsername = (e) => {
		handleInputChange(e, setUsername, /[^a-zA-Z0-9ñÑ]/g)
	}

	const handleChangeEmail = (e) => {
		const value = e.target.value
		setEmail(value)
	}

	const validateEmail = (email) => {
		const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
		return regex.test(email)
	}

	const handleChangePassword = (e) => {
		const value = e.target.value
		setPassword(value)
		if (value.length > 5) handlePasswordBlur()
	}
	const handleUsernameBlur = () => {
		if (!username) {
			setUsernameError('Please enter your username')
			return false
		} else {
			setUsernameError('')
			return true
		}
	}

	const handleEmailBlur = () => {
		if (!email) {
			setEmailError('Please enter your email')
		} else if (!validateEmail(email)) {
			setEmailError('Please enter a valid email')
			return false
		} else {
			setEmailError('')
			return true
		}
	}

	const handlePasswordBlur = () => {
		if (!password) {
			setPasswordError('Please enter your password')
		} else if (password.length < 5) {
			setPasswordError('Password must be at least 5 characters long')
			return false
		} else {
			setPasswordError('')
			return true
		}
	}
	const formReset = () => {
		setUsername('')
		setEmail('')
		setPassword('')
	}
	const formValidate = () => {
		if (handleUsernameBlur() && handleEmailBlur() && handlePasswordBlur()) {
			setErrorForm(false)
			return true
		} else {
			setErrorForm(true)
			return false
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!formValidate()) return

		const form = e.currentTarget
		const formData = new FormData(form)
		const { username, email, password } = Object.fromEntries(formData)
		console.log(username, email, password)
		form.querySelectorAll('input').forEach((input) => input.blur())
		formReset()
	}

	return (
		<div className="mb-28 flex-grow space-y-6 pt-16">
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
					required
				/>
				{usernameError && <p className="text-red-500">{usernameError}</p>}

				<Input
					name="email"
					id="email"
					label="Your Email:"
					type="email"
					placeholder="youremail@domain.com"
					value={email}
					onBlur={handleEmailBlur}
					onChange={handleChangeEmail}
					required
				/>
				{emailError && <p className="text-red-500">{emailError}</p>}

				<Input
					name="password"
					id="password"
					label="Your Password:"
					type="password"
					placeholder="••••••••••••••••••"
					value={password}
					onBlur={handlePasswordBlur}
					onChange={handleChangePassword}
					required
				/>
				{passwordError && <p className="text-red-500">{passwordError}</p>}

				<Button>Sign Up</Button>
				{errorForm && (
					<p className="text-red-500">
						Please fill in all the fields correctly.
					</p>
				)}
			</form>
		</div>
	)
}
