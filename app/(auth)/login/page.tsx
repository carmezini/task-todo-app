'use client';
import React, { useState } from 'react';
import styles from '../Form.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { HiMiniAtSymbol, HiFingerPrint } from 'react-icons/hi2';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import loginValidate from '../lib/validate';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: loginValidate,
        onSubmit,
    });

    async function GitHubSignin() {
        await signIn('github', {
            callbackUrl: '/dashboard',
        })
    };

    async function GoogleSignin() {
        await signIn("google");
    }

    async function onSubmit(values: any) {
        console.log(values);
        const status = await signIn('credentials', {
            ...values,
            redirect: false,
        });

            router.push('/dashboard');
    }

    return (
        <>
            <section className='w-3/4 mx-auto flex flex-col gap-8'>
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
                <form
                    className='flex flex-col gap-5'
                    onSubmit={formik.handleSubmit}
                >
                    <div className={styles.input_group}>
                        <input
                            type='email'
                            //@ts-ignore
                            name='email'
                            placeholder='John@example.com'
                            className={styles.input_text}
                            {...formik.getFieldProps('email')}
                        />
                        <span className='icon flex items-center px-4'>
                            <HiMiniAtSymbol size={25} />
                        </span>
                    </div>
                    {formik.errors.email && formik.touched.email ? (
                        <span className='text-red-500 py-0'>
                            {formik.errors.email}
                        </span>
                    ) : (
                        <></>
                    )}
                    <div className={styles.input_group}>
                        <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            //@ts-ignore
                            name='password'
                            placeholder='password'
                            className={styles.input_text}
                            {...formik.getFieldProps('password')}
                        />
                        <span
                            className='icon flex items-center px-4'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.password ? (
                        <span className='text-red-500'>
                            {formik.errors.password}
                        </span>
                    ) : (
                        <></>
                    )}
                    <div className='input-button'>
                        <button type='submit' className={styles.button}>
                            Login
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom} onClick={GoogleSignin}>
                            Sign In with Google
                            <Image
                                src={'/assets/google.svg'}
                                width={20}
                                height={20}
                                alt='googleIcon'
                            />
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom} onClick={GitHubSignin}>
                            Sign In with Github
                            <Image
                                src={'/assets/github.svg'}
                                width={25}
                                height={25}
                                alt='googleIcon'
                            />
                        </button>
                    </div>
                </form>
                <p className='text-center text-gray-400'>
                    Don't have an account yet?
                    <Link href={'/register'} className='text-blue-700'>
                        {''} Sign Up
                    </Link>
                </p>
            </section>
        </>
    );
}
