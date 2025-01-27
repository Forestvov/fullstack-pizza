'use client'

import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import { Category } from '@prisma/client'
import React from 'react'

interface Props {
	items: Category[]
	className?: string
}

export const Categories: React.FC<Props> = ({ className, items }) => {
	const categoryActiveId = useCategoryStore(state => state.activeId)
	return (
		<div
			className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
		>
			{items.map(cat => (
				<a
					href={`/#${cat.name}`}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						categoryActiveId === cat.id &&
							'bg-white shadow-md shadow-gray-200 text-primary'
					)}
					key={cat.id}
				>
					<button>{cat.name}</button>
				</a>
			))}
		</div>
	)
}
