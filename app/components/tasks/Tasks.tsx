'use client';
import { useGlobalState } from '@/app/context/GlobalProvider';
import React from 'react';
import styled from 'styled-components';

export default function Tasks() {
    const { theme } = useGlobalState();

    return (
    <TasksStyled theme={theme}>
        Tasks
    </TasksStyled>
    )
}

const TasksStyled = styled.div`
    padding: 2rem;
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }
`;