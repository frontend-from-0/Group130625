import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QuotesProvider } from '@/app/QuotesProvider';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { auth0 } from '@/lib/auth0';
import LoginButton from '@/components/LoginButton';
import { TypographyH1 } from '@/components/ui/h1';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Random Quotes App',
  description: 'Motivational quotes for every day.',
};

export default async function RootLayout({ children }) {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href='/'>Home Page</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href='/user/quotes/'>Liked Quotes</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href='/user/profile/'>Profile</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href='/auth/logout/'>Log Out</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {user ? (
          <QuotesProvider>{children}</QuotesProvider>
        ) : (
          // switched justify-items-center to justify-center
          <main className='min-h-dvh max-w-xl mx-auto flex flex-col items-center justify-center text-center gap-8'>
            <TypographyH1>
              Welcome! Please log in to access your protected content.
            </TypographyH1>
            <LoginButton />
          </main>
        )}
      </body>
    </html>
  );
}
