import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context'
import { useNavigate } from 'react-router-dom'

export function useSignUp() {
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

	const getAccountsLocalstorage = () => {
		return JSON.parse(localStorage.getItem('accountsStore')) || []
	}
	const accounts = getAccountsLocalstorage()

	const handleInputChange = (e, setter, regex) => {
		const value = e.target.value
			.slice(0, 30)
			.replace(/\s/g, '')
			.replace(regex, '')
		setter(value)
	}

	const handleChangeUsername = (e) => {
		handleInputChange(e, setUsername, /[^a-zA-Z0-9ñÑ]/g)
		setUsernameError('')
	}

	const handleChangeEmail = (e) => {
		const value = e.target.value
		setEmail(value)
		setEmailError('')
	}

	const validateEmail = (email) => {
		const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
		return regex.test(email)
	}

	const handleChangePassword = (e) => {
		const value = e.target.value
		setPassword(value)
		if (value.length > 5) handlePasswordBlur()
		setPasswordError('')
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
			setFormError('')
			return true
		} else {
			setFormError('Please fill in all the fields correctly.')
			return false
		}
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

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!formValidate()) return
		const form = e.currentTarget
		const formData = new FormData(form)
		const { username, email, password } = Object.fromEntries(formData)
		const isValidate = existUserAndEmail(username, email)
		if (!isValidate) return
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
		sessionStorage.setItem(
			'currentCount',
			JSON.stringify({ username, email, password })
		)
		setAccount({
			username,
			email,
			password
		})
		activeAuth()
		setShouldRedirect(true)
	}
	useEffect(() => {
		const currentUser = sessionStorage.getItem('currentCount')
		if (currentUser && shouldRedirect) {
			navigate('/')
		}
	}, [shouldRedirect])

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
