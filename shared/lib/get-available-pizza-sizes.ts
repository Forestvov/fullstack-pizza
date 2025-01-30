import { ProductVariation } from '@prisma/client'
import { Variant } from '../components/shared/group-variants'
import { pizzaSize, PizzaType } from '../constants/pizza'

/**
 *
 * @param type PizzaType
 * @param variations ProductVariation[]
 * @returns Variant[]
 */
export const getAvailablePizzaSizes = (
	type: PizzaType,
	variations: ProductVariation[]
): Variant[] => {
	const filteredPizzasByType = variations.filter(
		item => item.pizzaType === type
	)

	return pizzaSize.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some(
			pizza => Number(pizza.size) === Number(item.value)
		),
	}))
}
