import { ProductVariation } from '@prisma/client'
import React from 'react'
import { useSet } from 'react-use'
import { Variant } from '../components/shared/group-variants'
import { PizzaSize, PizzaType } from '../constants/pizza'
import { getAvailablePizzaSizes } from '../lib'

interface ReturnProps {
	size: PizzaSize
	type: PizzaType
	selectedIngredients: Set<number>
	availableSizes: Variant[]
	setSize: (size: PizzaSize) => void
	setType: (type: PizzaType) => void
	addIngredient: (id: number) => void
}

export const usePizzaOptions = (
	variations: ProductVariation[]
): ReturnProps => {
	const [size, setSize] = React.useState<PizzaSize>(20)
	const [type, setType] = React.useState<PizzaType>(1)

	const availableSizes = getAvailablePizzaSizes(type, variations)

	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	)

	React.useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			item => Number(item.value) === size && !item.disabled
		)
		const availableSize = availableSizes?.find(item => !item.disabled)

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize)
		}
	}, [availableSizes, size, type])

	return {
		size,
		type,
		selectedIngredients,
		availableSizes,
		setType,
		setSize,
		addIngredient,
	}
}
