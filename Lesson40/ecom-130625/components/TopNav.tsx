'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function TopNav({ isAuthenticated }: { isAuthenticated: boolean }) {
	const pathname = usePathname();
	if (pathname.startsWith('/admin')) return null;

	return (
		<header className='w-full border-b border-white/8 bg-[#060812] text-white'>
			<div className='mx-auto max-w-4xl px-6 py-4 flex items-center justify-between'>
				<nav className='flex items-center gap-3'>
					{isAuthenticated ? (
						<>
							<Button
								asChild
								variant='ghost'
							>
								<Link href='/user/profile'>Profile</Link>
							</Button>
							<Button
								asChild
								variant='ghost'
							>
								<a href='/auth/logout'>Logout</a>
							</Button>
						</>
					) : (
						<Button
							asChild
							variant='ghost'
						>
							<a href='/auth/login'>Login</a>
						</Button>
					)}
				</nav>

				<Link
					href='/'
					className='text-lg font-semibold tracking-tight hover:opacity-90 transition-opacity'
				>
					VoltHaus
				</Link>
			</div>
		</header>
	);
}
