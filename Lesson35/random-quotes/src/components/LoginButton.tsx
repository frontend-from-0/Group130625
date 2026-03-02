"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginButton() {
  return (
    <Button asChild variant="default">
       <Link href="/auth/login">Login</Link>
    </Button>
  );
}