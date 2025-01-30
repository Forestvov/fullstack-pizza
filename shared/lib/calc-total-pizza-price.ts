import { Ingredient, ProductVariation } from '@prisma/client'
import { PizzaSize, PizzaType } from '../constants/pizza'

/**
 * Функция расчета стоимости пиццы
 * @param type PizzaSize
 * @param size PizzaType
 * @param variations ProductVariation
 * @param ingredients Ingredient
 * @param selectedIngredients Set<number>
 * @returns number - общая стоимость пиццы
 */
export const calcTotalPizzaPrice = (
	type: PizzaType,
	size: PizzaSize,
	variations: ProductVariation[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice =
		variations.find(item => item.pizzaType === type && item.size === size)
			?.price || 0
	const totalIngredientsPrice = ingredients
		.filter(ingredient => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)

	return pizzaPrice + totalIngredientsPrice
}
