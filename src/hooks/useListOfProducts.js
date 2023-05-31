import { gql, useQuery } from '@apollo/client'

const GET_PRODUCTS = gql`
	query Products {
		products(limit: 30, offset: 0) {
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
export const useListOfProducts = () => {
	const { loading, error, data } = useQuery(GET_PRODUCTS)
	if (!data) return { loading, error }
	const products = data?.products?.map((product) => {
		return {
			id: product.id,
			title: product.title,
			price: product.price,
			category: product.category.name,
			image: product.images[0]
		}
	})

	return { loading, error, products }
}
