import { gql, useQuery } from '@apollo/client'

const GET_PRODUCTS = gql`
	query Product($productId: ID!) {
		product(id: $productId) {
			id
			images
			price
			title
			description
			category {
				name
			}
		}
	}
`
export const useProductById = ({ productId }) => {
	const { loading, error, data } = useQuery(GET_PRODUCTS, {
		variables: { productId }
	})
	console.log(data)
	if (!data) return { loading, error }
	const product = {
		id: data.product.id,
		image: data.product.images[0],
		price: data.product.price,
		title: data.product.title,
		description: data.product.description,
		category: data.product.category.name
	}
	console.log(product)
	return { loading, error, product }
}
