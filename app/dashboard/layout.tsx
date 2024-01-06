'use client';
import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/sidebar/SideBar';
import { useSession } from "next-auth/react"
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { data: session, status } = useSession()

    if (status !== "authenticated") {
        redirect('/');
    }

    return (
        <DashboardStyles className='flex p-10 gap-10 h-full'>
            <Sidebar />
            {children}
        </DashboardStyles>
    );
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
`;
