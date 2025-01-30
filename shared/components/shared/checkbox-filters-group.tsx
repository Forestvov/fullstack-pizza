'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Input, Skeleton } from '../ui'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'

interface Props {
	title: string
	items: FilterCheckboxProps[]
	defaultItems?: FilterCheckboxProps[]
	limit?: number
	searchInputPlaceholder?: string
	onClickCheckbox?: (id: string) => void
	defaultValues?: string[]
	className?: string
	loading: boolean
	selected?: Set<string>
	name: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	onClickCheckbox,
	defaultValues,
	selected,
	className,
	loading,
	name,
}) => {
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>
				{...Array(limit)
					.fill(limit)
					.map((_, idx) => (
						<Skeleton className='mb-4 h-6 rounded-[8px]' key={idx} />
					))}

				<Skeleton className='w-28 mb-4 h-6 rounded-[8px]' />
			</div>
		)
	}

	const list = showAll
		? items.filter(item =>
				item.text.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: (defaultItems || items).slice(0, limit)

	return (
		<div className={cn(className)}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						className='bg-gray-50 border-none'
						placeholder={searchInputPlaceholder}
						onChange={handleChangeSearch}
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, idx) => (
					<FilterCheckbox
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						checked={selected?.has(item.value)}
						key={idx}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
						name={name}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						className='text-primary mt-4'
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	)
}
