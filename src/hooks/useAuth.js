import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
	const { setAccount, activeAuth } = useContext(ProductContext)
	const [username, setUsername] = useState('')
	const [usernameError, setUsernameError] = useState('')
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [formError, setFormError] = useState('')
	const [shouldRedirect, setShouldRedirect] = useState(false)
	const navigate = useNavigate()

	const accounts = JSON.parse(localStorage.getItem('accountsStore')) || []

	const handleInputChange = (e, setter, regex) => {
		const value = e.target.value
			.slice(0, 30)
			.replace(/\s/g, '')
			.replace(regex, '')
		setter(value)
	}

	// Handle Change Inputs
	const handleChangeUsername = (e) => {
		handleInputChange(e, setUsername, /[^a-zA-Z0-9ñÑ]/g)
		setUsernameError('')
	}
	const handleChangeEmail = (e) => {
		const value = e.target.value
		setEmail(value)
		setEmailError('')
	}
	const handleChangePassword = (e) => {
		const value = e.target.value
		setPassword(value)
		if (value.length > 5) handlePasswordBlur()
		setPasswordError('')
	}

	// Handle Blur Inputs
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
			setFormError('')
			return true
		} else {
			setFormError('Please fill in all the fields correctly.')
			return false
		}
	}
	const validateEmail = (email) => {
		const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
		return regex.test(email)
	}
	const existUserAndEmail = (username, email) => {
		const emailExists = accounts.some((account) => {
			return account.email.toLowerCase() === email.toLowerCase()
		})

		const usernameExists = accounts.some((account) => {
			return account.username.toLowerCase() === username.toLowerCase()
		})

		if (emailExists && usernameExists) {
			setFormError('Email and username already exist')
		} else if (emailExists) {
			setFormError('The email already exists')
		} else if (usernameExists) {
			setFormError('User already exists')
		} else {
			setFormError('')
		}
		return !emailExists && !usernameExists
	}
	useEffect(() => {
		const currentUser = sessionStorage.getItem('currentCount')
		if (currentUser && shouldRedirect) {
			navigate('/')
		}
	}, [shouldRedirect])

	/********************************
	 * Sign Up
	 ********************************/

	const signUp = () => {
		const handleSubmit = (e) => {
			e.preventDefault()

			if (!formValidate()) return

			const form = e.currentTarget
			const formData = new FormData(form)
			const { username, email, password } = Object.fromEntries(formData)

			const isValidate = existUserAndEmail(username, email)
			if (!isValidate) return

			// Reset from
			form.querySelectorAll('input').forEach((input) => input.blur())
			formReset()

			const newAccount = {
				username,
				email,
				password,
				favorites: [],
				cart: []
			}
			const updatedAccounts = [...accounts, newAccount]

			localStorage.setItem('accountsStore', JSON.stringify(updatedAccounts))
			sessionStorage.setItem('currentCount', JSON.stringify(username))
			setAccount(username)
			activeAuth()
			setShouldRedirect(true)
		}

		// codigo de registro
		return {
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
		}
	}
	const logIn = () => {
		const [userNameEmail, setUserNameEmail] = useState('')
		const [userNameEmailError, setUserNameEmailError] = useState('')

		const handleChangeUsernameEmail = (e) => {
			const value = e.target.value
			setUserNameEmail(value)
			setUserNameEmailError('')
		}
		const handleUsernameEmailBlur = () => {
			if (!userNameEmail) {
				setUserNameEmailError('Please enter your username or email')
				return false
			} else {
				setUserNameEmailError('')
				return true
			}
		}
		const ValidateFormLogIn = () => {
			if (handleUsernameEmailBlur() && handlePasswordBlur()) {
				setFormError('')
				return true
			} else {
				setFormError('Please fill in all the fields correctly.')
				return false
			}
		}
		const existUserOrEmail = (usernameOrEmail, password) => {
			const emailExists = accounts.some((acc) => {
				return acc.email.toLowerCase() === usernameOrEmail.toLowerCase()
			})

			const usernameExists = accounts.some((acc) => {
				return acc.username.toLowerCase() === usernameOrEmail.toLowerCase()
			})
			const passwordExists = accounts.some((acc) => {
				return acc.password.toLowerCase() === password.toLowerCase()
			})
			const usernameOrEmailExist = emailExists || usernameExists

			if (!usernameOrEmailExist) {
				setFormError('Invalid email or username.')
				return
			} else {
				setFormError('')
			}
			if (!passwordExists) {
				setFormError('Incorrect password.')
			} else {
				setFormError('')
			}
			console.log((emailExists || usernameExists) && passwordExists)
			return (emailExists || usernameExists) && passwordExists
		}
		const getUsername = (usernameOrEmail) => {
			const account = accounts.find((acc) => {
				return acc.username === usernameOrEmail || acc.email === usernameOrEmail
			})
			const username = account.username

			return { username }
		}
		const handleSubmit = (e) => {
			e.preventDefault()

			if (!ValidateFormLogIn()) return

			const form = e.currentTarget
			const formData = new FormData(form)
			const { usernameOrEmail, password } = Object.fromEntries(formData)

			const isValidate = existUserOrEmail(usernameOrEmail, password)
			if (!isValidate) return
			const { username } = getUsername(usernameOrEmail)
			// Reset from
			form.querySelectorAll('input').forEach((input) => input.blur())
			formReset()
			sessionStorage.setItem('currentCount', JSON.stringify(username))

			setAccount(username)
			activeAuth()
			setShouldRedirect(true)
		}
		// cosigo de Login
		return {
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
		}
	}
	return { signUp, logIn }
}
