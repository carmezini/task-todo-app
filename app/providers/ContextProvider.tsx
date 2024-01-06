'use client';
import React, { useEffect, useState } from 'react';
import { GlobalProvider } from '../context/GlobalProvider';
import { Toaster } from 'react-hot-toast';

interface Props {
    children: React.ReactNode;
}

export default function ContextProvider({ children }: Props) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 200);
    }, []);

    if (!isReady) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <div className='loader'></div>
            </div>
        )
    }

    return (
        <>
            <Toaster />
            {children}
        </>
    );
}
