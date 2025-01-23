'use client'

import { useCategoryStore } from '@/store/category'
import React from 'react'
import { useIntersection } from 'react-use'
import { ProductCard } from './product-card'
import { Title } from './title'

interface Props {
	title: string
	items: unknown[]
	categoryId: number
	className?: string
	listClassName?: string
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	categoryId,
	className,
	listClassName,
}) => {
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, {
		rootMargin: '0px',
		threshold: 0.5,
	})

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	}, [categoryId, intersection])

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<div className='grid grid-cols-3 gap-[50px]'>
				{items.map((product, i) => (
					<ProductCard
						key={i}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0].price}
						count={i % 2}
						id={product.id}
					/>
				))}
			</div>
		</div>
	)
}
