import { prisma } from '@/prisma/prisma-client'
import {
	Container,
	GroupVariants,
	PizzaImage,
	Title,
} from '@/shared/components/shared'
import { notFound } from 'next/navigation'

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string }
}) {
	const product = await prisma.product.findFirst({ where: { id: Number(id) } })

	if (!product) return notFound()

	return (
		<Container className='flex flex-col mt-20'>
			<div className='flex flex-1'>
				<PizzaImage
					className=''
					src={product.imageUrl}
					alt={product.name}
					size={30}
				/>

				<div className='w-[490px] bg-[#f7f6f5] p-7'>
					<Title
						className='font-extrabold mb-1'
						size='md'
						text={product.name}
					/>

					<p className='text-gray-400'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
						dicta quas amet, quibusdam alias, veritatis illo ducimus ullam ad
						fugiat, doloremque voluptatibus quisquam? Voluptatem, accusamus
						corporis incidunt dolor deleniti aliquam!
					</p>

					<GroupVariants
						selectedValue='2'
						items={[
							{
								name: 'Small',
								value: '1',
							},
							{
								name: 'Medium',
								value: '2',
							},
							{
								name: 'Large',
								value: '3',
								disabled: true,
							},
						]}
					/>
				</div>
			</div>
		</Container>
	)
}
