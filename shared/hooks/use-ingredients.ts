import { Api } from '@/shared/services/api-client'
import { Ingredient } from '@prisma/client'
import React from 'react'

type IngredientItemType = Pick<Ingredient, 'id' | 'name'>

interface ReturnProps {
	ingredients: IngredientItemType[]
	loading: boolean
}

export const useIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = React.useState<IngredientItemType[]>([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		async function getIngredients() {
			try {
				setLoading(true)
				const ingredients = await Api.ingredients.getAll()
				setIngredients(
					ingredients.map(item => ({
						id: item.id,
						name: item.name,
					}))
				)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		getIngredients()
	}, [])

	return {
		ingredients,
		loading,
	}
}
