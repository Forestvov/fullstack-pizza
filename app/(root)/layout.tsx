import { Header } from '@/shared/components/shared'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'FullStack Pizza | Главная',
}

interface Props {
	children: React.ReactNode
	modal: React.ReactNode
}

export default function RootLayout({ children, modal }: Readonly<Props>) {
	return (
		<main className='min-h-screen'>
			<Header />
			{children}
			{modal}
		</main>
	)
}
