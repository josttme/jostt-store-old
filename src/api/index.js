import API_2 from './api.json'
/* const API = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10' */

export default function getProducts() {
	const mappedProducts = API_2.map((product) => ({
		id: product.id,
		title: product.title,
		price: product.price,
		description: product.description,
		category: product.category.name,
		image: product.images[0]
	}))
	return {
		products: mappedProducts
	}
}
