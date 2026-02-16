import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className='w-2xl bg-slate-700 rounded-md p-10 flex flex-col'>
      {children}
    </div>
  );
}
