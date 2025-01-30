'use client'

import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React from 'react'
import { Input } from '../ui'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { RangeSlider } from './range-slider'
import { Title } from './title'

interface Props {
	className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const router = useRouter()
	const { ingredients, loading } = useIngredients()
	const filters = useFilters()

	useQueryFilters(filters)

	const items = ingredients.map(item => ({
		value: String(item.id),
		text: item.name,
	}))

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

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}
	return (
		<div className={cn(className)}>
			<Title className='mb-5 font-bold' text='Фильтрация' size='sm' />

			<CheckboxFiltersGroup
				title='Тип теста'
				name='pizzaTypes'
				className='mb-5'
				items={[
					{
						text: 'Тонкое',
						value: '1',
					},
					{
						text: 'Традиционное',
						value: '2',
					},
				]}
				onClickCheckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
				loading={false}
			/>

			<CheckboxFiltersGroup
				title='Размеры'
				name='sizes'
				className='mb-5'
				items={[
					{
						text: '20 см',
						value: '20',
					},
					{
						text: '30 см',
						value: '30',
					},
					{
						text: '40 см',
						value: '40',
					},
				]}
				onClickCheckbox={filters.setSizes}
				selected={filters.sizes}
				loading={false}
			/>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						value={String(filters.priceFrom)}
						onChange={e =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						min={100}
						max={1000}
						placeholder='1000'
						value={String(filters.priceTo)}
						onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[filters.priceFrom || 0, filters.priceTo || 1000]}
					onValueChange={updatePrices}
				/>
			</div>

			<CheckboxFiltersGroup
				className='mt-5'
				title='Ингредиенты'
				limit={6}
				defaultItems={items}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setIngredients}
				selected={filters.selectedIngredients}
				name='ingredients'
			/>
		</div>
	)
}
