import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { categories, ingredients, products } from './constants'
import { prisma } from './prisma-client'

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min) / 10
}

const generateProductVariation = (
	productId: number,
	pizzaType?: 1 | 2,
	size?: 20 | 30 | 40
) => {
	return {
		productId,
		size,
		price: randomNumber(190, 600),
		pizzaType,
	} as Prisma.ProductVariationUncheckedCreateInput
}

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'John Doe',
				email: 'john@doe.com',
				password: hashSync('password', 10),

				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin',
				email: 'admin@mail.ru',
				password: hashSync('password', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	})

	await prisma.category.createMany({ data: categories })
	await prisma.ingredient.createMany({ data: ingredients })
	await prisma.product.createMany({ data: products })

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Двойная пепперони',
			categoryId: 1,
			imageUrl:
				'https://media.dodostatic.net/image/r:292x292/11ef8537f2244e8caeb7c69e644d0537.avif',
			ingredients: {
				connect: ingredients.slice(0, 5),
			},
		},
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Овощи и грибы',
			categoryId: 1,
			imageUrl:
				'https://media.dodostatic.net/image/r:292x292/11ee7d61546d8483a61a0bbaa7adcc78.avif',
			ingredients: {
				connect: ingredients.slice(5, 9),
			},
		},
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Цыпленок барбекю',
			categoryId: 1,
			imageUrl:
				'https://media.dodostatic.net/image/r:292x292/11ee7d6110059795842d40396bcf1e73.avif',
			ingredients: {
				connect: ingredients.slice(10, 40),
			},
		},
	})

	await prisma.productVariation.createMany({
		data: [
			// Двойная пепперони
			generateProductVariation(pizza1.id, 1, 20),
			generateProductVariation(pizza1.id, 1, 30),
			generateProductVariation(pizza1.id, 1, 40),
			generateProductVariation(pizza1.id, 2, 20),
			generateProductVariation(pizza1.id, 2, 30),
			generateProductVariation(pizza1.id, 2, 40),

			// Овощи и грибы
			generateProductVariation(pizza2.id, 1, 20),
			generateProductVariation(pizza2.id, 1, 40),
			generateProductVariation(pizza2.id, 2, 30),
			generateProductVariation(pizza2.id, 2, 40),

			// Цыпленок барбекю
			generateProductVariation(pizza3.id, 1, 20),
			generateProductVariation(pizza3.id, 1, 40),
			generateProductVariation(pizza3.id, 2, 30),
			generateProductVariation(pizza3.id, 2, 40),

			// Остальные продукты
			generateProductVariation(1),
			generateProductVariation(2),
			generateProductVariation(3),
			generateProductVariation(4),
			generateProductVariation(5),
			generateProductVariation(6),
			generateProductVariation(7),
			generateProductVariation(8),
			generateProductVariation(9),
			generateProductVariation(10),
			generateProductVariation(11),
			generateProductVariation(12),
			generateProductVariation(13),
			generateProductVariation(14),
			generateProductVariation(15),
			generateProductVariation(16),
			generateProductVariation(17),
		],
	})

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '555555',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '333',
			},
		],
	})

	await prisma.cartItem.create({
		data: {
			productVariationId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
