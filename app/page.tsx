import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar,
} from '@/components/shared'

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title className='font-extrabold' text='Все пиццы' size='lg' />
			</Container>
			<TopBar />

			<Container className='pb-14 mt-10'>
				<div className='flex gap-[60px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>

					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductsGroupList
								title='Пиццы'
								items={[
									{
										id: 1,
										name: 'Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
										items: [{ price: 550 }],
									},
									{
										id: 2,
										name: 'Говядина с песто',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif',
										items: [{ price: 779 }],
									},
									{
										id: 3,
										name: 'Бефстроганов',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11eef9e43dc39c94aa5765dbf1c97100.avif',
										items: [{ price: 539 }],
									},
									{
										id: 4,
										name: 'Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
										items: [{ price: 550 }],
									},
									{
										id: 5,
										name: 'Говядина с песто',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif',
										items: [{ price: 779 }],
									},
									{
										id: 6,
										name: 'Бефстроганов',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11eef9e43dc39c94aa5765dbf1c97100.avif',
										items: [{ price: 539 }],
									},
								]}
								categoryId={1}
							/>

							<ProductsGroupList
								title='Комбо'
								items={[
									{
										id: 1,
										name: 'Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
										items: [{ price: 550 }],
									},
									{
										id: 2,
										name: 'Говядина с песто',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif',
										items: [{ price: 779 }],
									},
									{
										id: 3,
										name: 'Бефстроганов',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11eef9e43dc39c94aa5765dbf1c97100.avif',
										items: [{ price: 539 }],
									},
									{
										id: 4,
										name: 'Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
										items: [{ price: 550 }],
									},
									{
										id: 5,
										name: 'Говядина с песто',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif',
										items: [{ price: 779 }],
									},
									{
										id: 6,
										name: 'Бефстроганов',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11eef9e43dc39c94aa5765dbf1c97100.avif',
										items: [{ price: 539 }],
									},
								]}
								categoryId={2}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
