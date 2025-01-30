'use client'

import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza'
import { usePizzaOptions } from '@/shared/hooks'
import { getPizzaDetails } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'
import { Ingredient, ProductVariation } from '@prisma/client'
import React from 'react'
import { Button } from '../ui'
import { GroupVariants } from './group-variants'
import { IngredientItem } from './ingredient-item'
import { PizzaImage } from './pizza-image'
import { Title } from './title'

interface Props {
	imageUrl: string
	name: string
	ingredients: Ingredient[]
	variations: ProductVariation[]
	className?: string
	onClickAddCart?: VoidFunction
}

export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	ingredients,
	variations,
	className,
	onClickAddCart,
}) => {
	const {
		size,
		type,
		selectedIngredients,
		availableSizes,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(variations)

	const { textDetails, totalPrice } = getPizzaDetails(
		type,
		size,
		variations,
		ingredients,
		selectedIngredients
	)

	const handleClickAdd = () => {
		onClickAddCart?.()
		console.log({
			size,
			type,
			ingredients: selectedIngredients,
		})
	}
	return (
		<div className={cn('flex flex-1', className)}>
			<PizzaImage src={imageUrl} alt={name} size={size} />

			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title className='font-extrabold mb-1' text={name} size='md' />

				<p className='text-gray-400'>{textDetails}</p>

				<div className='flex flex-col gap-2 mt-5'>
					<GroupVariants
						items={availableSizes}
						value={String(size)}
						onClick={value => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={value => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className='mt-5 bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
					<div className='grid grid-cols-3 gap-3'>
						{ingredients.map(ingredient => (
							<IngredientItem
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => addIngredient(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
					onClick={handleClickAdd}
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	)
}
