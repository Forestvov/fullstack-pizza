import { prisma } from '@/prisma/prisma-client'
import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar,
} from '@/shared/components/shared'

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
					variations: true,
				},
			},
		},
	})

	return (
		<>
			<Container className='mt-10'>
				<Title className='font-extrabold' text='Все пиццы' size='lg' />
			</Container>

			<TopBar
				categories={categories.filter(category => category.products.length > 0)}
			/>

			<Container className='pb-14 mt-10'>
				<div className='flex gap-[60px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>

					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								category =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
