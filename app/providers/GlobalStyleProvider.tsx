'use client';
import React from 'react';
import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
}

export default function GlobalStyleProvider({ children }: Props) {
    return (
        <div className='flex p-10 gap-10 h-full'>
            {children}
        </div>
    )
}
