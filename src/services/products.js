function transformProductData(product) {
	return {
		id: product.id,
		title: product.title,
		price: product.price,
		description: product.description,
		category: product.category.name,
		image: product.images[0]
	}
}

export async function searchProducts({ search }) {
	if (search === '') return null
	try {
		const res = await fetch(
			`https://api.escuelajs.co/api/v1/products/?title=${search}`
		)
		const products = await res.json()
		return products?.map((product) => transformProductData(product))
	} catch (e) {
		throw new Error('Error al buscar los productos')
	}
}

export async function getProducts() {
	try {
		const res = await fetch(
			'https://api.escuelajs.co/api/v1/products?offset=0&limit=10'
		)
		const products = await res.json()
		return products?.map((product) => transformProductData(product))
	} catch (e) {
		throw new Error('Error al obtener los productos')
	}
}
