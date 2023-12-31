'use client';
import React, { useEffect, useState } from 'react';
import { GlobalProvider } from '../context/GlobalProvider';

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
        return null;
    }

    return <GlobalProvider>{children}</GlobalProvider>;
}
