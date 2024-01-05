'use client';
import React from 'react';
import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
}

export default function GlobalStyleProvider({ children }: Props) {
    return (
        <GlobalStyles className='flex p-10 gap-10 h-full'>
            {children}
        </GlobalStyles>
    )
}

const GlobalStyles = styled.div`
    padding: 2.5rem;
    display: flex;
    gap: 2.5rem;
    height: 100%;

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
`