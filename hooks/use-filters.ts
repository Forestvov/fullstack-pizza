import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useSet } from 'react-use'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	pizzaTypes: string
	sizes: string
	ingredients: string
}

export interface Filters {
	selectedIngredients: Set<string>
	sizes: Set<string>
	pizzaTypes: Set<string>
	priceFrom: number
	priceTo: number
}

interface ReturnProps extends Filters {
	setSizes: (value: string) => void
	setPizzaTypes: (value: string) => void
	setIngredients: (value: string) => void
	setPrices: (name: keyof PriceProps, value: number) => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(','))
	)

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
		)
	)

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.has('pizzaTypes')
				? searchParams.get('pizzaTypes')?.split(',')
				: []
		)
	)

	const [{ priceFrom, priceTo }, setPrices] = React.useState<PriceProps>({
		priceFrom: searchParams.has('priceFrom')
			? Number(searchParams.get('priceFrom'))
			: undefined,
		priceTo: searchParams.has('priceTo')
			? Number(searchParams.get('priceTo'))
			: undefined,
	})

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices(prev => {
			return {
				...prev,
				[name]: value,
			}
		})
	}

	return {
		selectedIngredients,
		sizes,
		pizzaTypes,
		priceFrom,
		priceTo,
		setSizes: toggleSizes,
		setPizzaTypes: togglePizzaTypes,
		setIngredients: toggleIngredients,
		setPrices: updatePrice,
	}
}
