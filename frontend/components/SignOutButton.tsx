import { useRouter } from 'next/router'
import React from 'react'

const SignOutButton = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const { push, reload } = useRouter()

  // console.log('isProduction', isProduction)

  const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_PROD_API_SIGNOUT_URL
    : 'http://localhost:3000/api/session/sign-out'; // URL local

  const handleSignOut = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // push('/auth/sign-in');
        reload();
      } else {
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div>
      <button onClick={handleSignOut} className='px-4 py-2 dark:bg-black/90 rounded-md text-white font-semibold whitespace-nowrap'>Sign Out</button>
    </div>
  )
}

export default SignOutButton