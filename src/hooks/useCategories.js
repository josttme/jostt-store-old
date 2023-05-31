import { gql, useQuery } from '@apollo/client'

const GET_PRODUCTS = gql`
	query Categories($categoryId: Float) {
		products(categoryId: $categoryId) {
			id
			images
			price
			title
			category {
				id
				name
			}
		}
	}
`
export const useCategoryProducts = ({ categoryId }) => {
	console.log(categoryId)
	const { loading, error, data } = useQuery(GET_PRODUCTS, {
		variables: { categoryId }
	})

	if (!data) return { loading, error }
	const products = data?.products?.map((product) => {
		return {
			id: product.id,
			title: product.title,
			price: product.price,
			description: product.description,
			category: product.category.name,
			categoryId: product.category.id,
			image: product.images[0]
		}
	})

	return { loading, error, products }
}
