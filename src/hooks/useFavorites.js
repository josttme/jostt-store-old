import { useLocalStorage } from './useLocalStorage'

export const useFavotites = (key, account, accountData) => {
	const [usersList, setUsersList] = useLocalStorage(key)

	const toggleFavorite = (favorite) => {
		const userIndex = usersList.findIndex((user) => {
			return user.username === account
		})
		console.log(usersList)

		if (userIndex !== -1) {
			// Si el producto ya existe en la lista de favoritos
			const favoritesList = usersList[userIndex].favorites

			const isFavoriteInList = favoritesList.some(
				(item) => item.id === favorite.id
			)

			if (isFavoriteInList) {
				// si ya existe, se eliminará de la lista
				const updatedFavorites = favoritesList.filter(
					(item) => item.id !== favorite.id
				)
				setUsersList([
					...usersList.slice(0, userIndex),
					{ ...usersList[userIndex], favorites: updatedFavorites },
					...usersList.slice(userIndex + 1)
				])
			} else {
				// Si el favorito no existe, se agregará a la lista

				setUsersList([
					...usersList.slice(0, userIndex),
					{
						...usersList[userIndex],
						favorites: [...favoritesList, favorite]
					},
					...usersList.slice(userIndex + 1)
				])
			}
		} else {
			setUsersList([...usersList, { ...accountData[0], favorites: [favorite] }])
		}
	}

	return [usersList, toggleFavorite]
}
