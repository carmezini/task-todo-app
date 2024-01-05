'use client';
import React from 'react';
import styles from './LayoutAuth.module.css';
import GlobalStyleProvider from '../providers/GlobalStyleProvider';
import styled from 'styled-components';
import Sidebar from '../components/sidebar/SideBar';

export default function DashboardLayout( { children }: { children: React.ReactNode } ) {
    return (
        <DashboardStyles className='flex p-10 gap-10 h-full'>
            <Sidebar />
            {children}
        </DashboardStyles>
    )
}

const DashboardStyles = styled.div`
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