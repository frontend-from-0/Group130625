'use client';

import { useEffect, useState } from 'react';

// Controlled inputs (set both value and onChange for the input) are standard in plain React applications
export default function ContolledFormExample() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (name.trim().length > 0 && name.trim().length < 3) {
      setNameError('The name should be at least 3 characters long');
    }
  }, [name]);

  return (
    <form action='' className='bg-slate-100'>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          className='border-slate-500 border'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError ? <p>{nameError}</p>: <></>}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' className='border-slate-500 border' />
      </div>
    </form>
  );
}
