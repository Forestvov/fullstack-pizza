import { Ingredient, ProductVariation } from '@prisma/client'
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza'
import { calcTotalPizzaPrice } from './calc-total-pizza-price'

/**
 * Функция получения стоимости и описания пиццы
 * @param type PizzaType
 * @param size PizzaSize
 * @param variations ProductVariation[]
 * @param ingredients Ingredient[]
 * @param selectedIngredients Set<number>
 * @returns `{textDetails, totalPrice}`
 */
export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	variations: ProductVariation[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const textDetails = `${size}см, ${mapPizzaType[type]} пицца`

	const totalPrice = calcTotalPizzaPrice(
		type,
		size,
		variations,
		ingredients,
		selectedIngredients
	)

	return {
		textDetails,
		totalPrice,
	}
}
