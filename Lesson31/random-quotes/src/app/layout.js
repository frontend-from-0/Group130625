import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QuotesProvider } from '@/app/QuotesProvider';
import Link from 'next/link';

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

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav>
          <Link href='/'>Home page</Link>
          <Link href='/user/quotes/'>Liked Quotes</Link>
        </nav>

        <QuotesProvider>{children}</QuotesProvider>
      </body>
    </html>
  );
}
