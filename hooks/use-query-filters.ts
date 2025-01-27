import { useRouter } from 'next/navigation'
import qs from 'qs'
import React from 'react'
import { Filters } from './use-filters'

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter()

	React.useEffect(() => {
		const params = {
			sizes: Array.from(filters.sizes),
			pizzaTypes: Array.from(filters.pizzaTypes),
			ingredients: Array.from(filters.selectedIngredients),
			priceFrom: filters.priceFrom,
			priceTo: filters.priceTo,
		}

		const query = qs.stringify(params, {
			arrayFormat: 'comma',
		})

		router.push(`?${query}`, {
			scroll: false,
		})
	}, [filters, router])
}
