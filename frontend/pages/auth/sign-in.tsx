import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { signIn } from '../../services/signIn'

const AuthPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  useEffect(() => {

    const classes = document.documentElement.className;
    console.log('Clases before deleting', classes);

    // delete  style="color-scheme: dark;  
    document.documentElement.removeAttribute('style');
    document.documentElement.removeAttribute('class');
  }, []);

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setErrors('')
    setIsLoading(true)
    const { accessToken, refreshToken, newPasswordRequired } = await signIn(email, password)
    if (accessToken && refreshToken) {
      console.log('success')
      push('/')
    }
    else if (newPasswordRequired) {
      console.log('newPasswordRequired')
      push('/auth/new-password')
    }
    else {
      setErrors('Invalid email or password')
      setIsLoading(false)
      console.log('error',)
    }
  };

  const handleNavigate = () => {
    push('/')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 min-w-[400px]'>
      <button onClick={handleNavigate} className='fixed top-10 left-10 w-10 h-10 bg-transparent rounded-md border flex justify-center items-center text-gray-800'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <div className='bg-transparent p-6 rounded-lg w-[400px] m-4'>
        <h2 className='text-3xl font-bold mb-10 text-zinc-900 text-center'>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className='mb-4 relative'>
            <label className='sr-only'>Email</label>
            <input type='email' className='pl-10 border rounded-md py-4 px-4 w-full' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className='absolute top-[38%] left-4 text-gray-500'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </div>
          </div>
          <div className='relative mb-4'>
            <label className='sr-only'>Password</label>
            <input type={showPassword ? 'text' : 'password'} className='pl-10  border rounded-md py-4 px-4 w-full' placeholder='Enter your password'
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className='absolute top-[38%] left-4 text-gray-500' >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <div className='absolute top-[38%] right-4 text-gray-500 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>)
              }
            </div>
          </div>
          {errors && <p className='text-red-500 text-sm mt-2 mb-2'>{errors}</p>}
          <button disabled={isLoading} className={isLoading ? 'cursor-not-allowed bg-zinc-900/80 py-4 px-4 w-full text-white font-semibold rounded-md' : ' py-4 px-4 w-full bg-zinc-900 text-white font-semibold rounded-md'} type='submit' >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
