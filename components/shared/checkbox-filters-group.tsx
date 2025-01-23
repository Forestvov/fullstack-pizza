'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { Input } from '../ui'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'

interface Props {
	title: string
	items: FilterCheckboxProps[]
	defaultItems: FilterCheckboxProps[]
	limit?: number
	searchInputPlaceholder?: string
	onChange?: (values: string[]) => void
	defaultValues?: string[]
	className?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	onChange,
	defaultValues,
	className,
}) => {
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const list = showAll
		? items.filter(item =>
				item.text.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: defaultItems.slice(0, limit)

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
						onCheckedChange={() => console.log(item.value)}
						checked={false}
						key={idx}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
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
