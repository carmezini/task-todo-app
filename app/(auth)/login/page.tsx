'use client';
import React, { useState } from 'react';
import styles from '../Form.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { HiMiniAtSymbol , HiFingerPrint } from "react-icons/hi2";
import { signIn } from 'next-auth/react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    async function handleGithubSignin() {
        await signIn('github', { callbackUrl: 'http://localhost:3000' });
    }

    /*const { data: session } = useSession();
    


    useEffect(() => {
        if (!session) {
            signIn();
        }
    }, [session]);

    if (session) {
        return <div />;
    }*/

    return (
        <>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>s
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>
                        Login
                    </h1>
                    <p className='w-3/4 mx-auto text-gray-400'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                </div>
                <form className='flex flex-col gap-5'>
                    <div className={styles.input_group}>
                        <input
                            type='email'
                            name='email'
                            placeholder='John@example.com'
                            className={styles.input_text}
                        />
                        <span className='icon flex items-center px-4'>
                            <HiMiniAtSymbol size={25} />
                        </span>
                    </div>
                    <div className={styles.input_group}>
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            name='password'
                            placeholder='password'
                            className={styles.input_text}
                        />
                        <span className='icon flex items-center px-4' onClick={() => setShowPassword(!showPassword)}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>
                    <div className='input-button'>
                        <button type='submit' className={styles.button}>Login</button>
                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom}>
                            Sign In with Google 
                            <Image src={'/assets/google.svg'} width={20} height={20} alt='googleIcon'/>
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom} onClick={handleGithubSignin}>
                            Sign In with Github
                            <Image src={'/assets/github.svg'} width={25} height={25} alt='googleIcon'/>
                        </button>
                    </div>
                </form>
                <p className='text-center text-gray-400'>
                    Don't have an account yet? 
                    <Link href={'/register'} className='text-blue-700'>
                        {""} Sign Up
                    </Link>
                </p>
            </section>
        </>
    );
}
