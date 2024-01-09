'use client';
import Link from 'next/link';
import styles from '../Form.module.css';
import toast from 'react-hot-toast';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
    const [show, setShow] = useState({ password: false, cpassword: false });
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            cpassword: '',
        },
        validate: registerValidate,
        onSubmit,
    });

    async function onSubmit(values: any) {
        const res = await axios.post('/api/register', values);

        if (res.data.error) {
            toast.error(res.data.error);
        }

        if (!res.data.error) {
            toast.success('User created successfully.');
            router.push('/login');
        }
    }

    return (
        <>
            <section className='w-3/4 mx-auto flex flex-col gap-2'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-2'>
                        Register
                    </h1>
                    <p className='w-3/4 mx-auto text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores, officia?
                    </p>
                </div>

                {/* form */}
                <form
                    className='flex flex-col gap-5'
                    onSubmit={formik.handleSubmit}
                >
                    <div className={styles.input_group}>
                        <input
                            type='text'
                            //@ts-ignore
                            name='name'
                            placeholder='Username'
                            className={styles.input_text}
                            {...formik.getFieldProps('user')}
                        />
                        <span className='icon flex items-center px-4'>
                            <HiOutlineUser size={25} />
                        </span>
                    </div>
                    {formik.errors.name && formik.touched.name ? (
                        <span className='text-red-500'>
                            {formik.errors.name}
                        </span>
                    ) : (
                        <></>
                    )}
                    <div className={styles.input_group}>
                        <input
                            type='email'
                            //@ts-ignore
                            name='email'
                            placeholder='Email'
                            className={styles.input_text}
                            {...formik.getFieldProps('email')}
                        />
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    {formik.errors.email && formik.touched.email ? (
                        <span className='text-red-500'>
                            {formik.errors.email}
                        </span>
                    ) : (
                        <></>
                    )}
                    <div className={styles.input_group}>
                        <input
                            type={`${show.password ? 'text' : 'password'}`}
                            //@ts-ignore
                            name='password'
                            placeholder='password'
                            className={styles.input_text}
                            {...formik.getFieldProps('password')}
                        />
                        <span
                            className='icon flex items-center px-4'
                            onClick={() =>
                                setShow({ ...show, password: !show.password })
                            }
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

                    <div className={styles.input_group}>
                        <input
                            type={`${show.cpassword ? 'text' : 'password'}`}
                            //@ts-ignore
                            name='cpassword'
                            placeholder='Confirm Password'
                            className={styles.input_text}
                            {...formik.getFieldProps('cpassword')}
                        />
                        <span
                            className='icon flex items-center px-4'
                            onClick={() =>
                                setShow({ ...show, cpassword: !show.cpassword })
                            }
                        >
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword ? (
                        <span className='text-red-500'>
                            {formik.errors.cpassword}
                        </span>
                    ) : (
                        <></>
                    )}

                    {/* login buttons */}
                    <div className='input-button'>
                        <button type='submit' className={styles.button}>
                            Sign Up
                        </button>
                    </div>
                </form>

                {/* bottom */}
                <p className='text-center text-gray-400'>
                    Already have an Account?
                    <Link href={'/login'} className='text-blue-700'>
                        {''} Login
                    </Link>
                </p>
            </section>
        </>
    );
}
