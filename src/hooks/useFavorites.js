export const useFavorites = (accounts, setAccounts, currentUser) => {
	const toggleFavorite = (favorite) => {
		console.log(accounts)
		const userIndex = accounts.findIndex((user) => {
			return user.username === currentUser
		})

		if (userIndex !== -1) {
			// Si el producto ya existe en la lista de favoritos
			const favoritesList = accounts[userIndex].favorites

			const isFavoriteInList = favoritesList.some(
				(item) => item.id === favorite.id
			)

			if (isFavoriteInList) {
				// si ya existe, se eliminará de la lista
				const updatedFavorites = favoritesList.filter(
					(item) => item.id !== favorite.id
				)
				setAccounts([
					...accounts.slice(0, userIndex),
					{ ...accounts[userIndex], favorites: updatedFavorites },
					...accounts.slice(userIndex + 1)
				])
			} else {
				// Si el favorito no existe, se agregará a la lista
				setAccounts([
					...accounts.slice(0, userIndex),
					{
						...accounts[userIndex],
						favorites: [...favoritesList, favorite]
					},
					...accounts.slice(userIndex + 1)
				])
			}
		}
	}

	return toggleFavorite
}
