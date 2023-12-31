import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { newPassword } from '../../services/newPassword';

const NewPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();

    const handleNewPassword = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setErrors('');
        setIsLoading(true);

        if (password !== confirmPassword) {
            setErrors('Passwords do not match');
            setIsLoading(false);
            return;
        }

        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        try {
            const result = await newPassword(password);

            if (result.status === 'success') {
                console.log('Success:', result.data.message);
                push('/auth/sign-in');
                setIsLoading(false);
            } else {
                console.error('Error:', result.message);
                console.error('Error:', result.error);
                setErrors(result.error);
                setIsLoading(false);
            }

            
        } catch (error) {
            console.error('Error:', error);
            setErrors('Error changing password');
            setIsLoading(false);
        }
    };

    const handleNavigate = () => {
        push('/auth/sign-in');
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 min-w-[400px]'>
            <button onClick={handleNavigate} className='fixed top-10 left-10 w-10 h-10 bg-transparent rounded-md border flex justify-center items-center text-gray-800'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <div className='bg-transparent p-6 rounded-lg w-[400px] m-4'>
                <h2 className='text-3xl font-bold mb-10 text-zinc-900 text-center'>New Password</h2>
                <form onSubmit={handleNewPassword}>
                    <div className='relative mb-4'>
                        <label className='sr-only'>New Password</label>
                        <div className='absolute top-[38%] left-4 text-gray-500' >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='pl-10 border rounded-md py-4 px-4 w-full'
                            placeholder='Enter your new password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='absolute top-[38%] right-4 text-gray-500 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>)
                            }
                        </div>
                    </div>
                    <div className='relative mb-4'>
                        <label className='sr-only'>Confirm Password</label>
                        <div className='absolute top-[38%] left-4 text-gray-500' >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='pl-10 border rounded-md py-4 px-4 w-full'
                            placeholder='Confirm your new password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
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
                    <button
                        disabled={isLoading}
                        className={isLoading ? 'cursor-not-allowed bg-zinc-900/80 py-4 px-4 w-full text-white font-semibold rounded-md' : ' py-4 px-4 w-full bg-zinc-900 text-white font-semibold rounded-md'}
                        type='submit'
                    >
                        {isLoading ? 'Loading...' : 'Change Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPasswordPage;
