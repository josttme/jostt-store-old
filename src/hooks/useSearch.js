import { useEffect, useRef, useState } from 'react'

export function useSearch() {
	const [search, updateSearch] = useState('')
	const [error, setError] = useState('')
	const isFirstImput = useRef(true)

	useEffect(() => {
		if (isFirstImput.current) {
			isFirstImput.current = search === ''
			return
		}
		if (search === '') {
			setError('no se puede buscar un producto vacio')
			return
		}
		if (search.match(/^\d+$/)) {
			setError('no se puede buscar un producto con numeros')
		}
		if (search.length < 3) {
			setError('no se puede buscar un producto con menos de 3 caracteres')
		}
	}, [search])
	return [search, updateSearch, error]
}
