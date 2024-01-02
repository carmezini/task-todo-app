'use client';
import { useGlobalState } from '@/app/context/GlobalProvider';
import React from 'react';
import styled from 'styled-components';
import CreateContent from '../modals/CreateContent';

export default function Tasks() {
    const { theme } = useGlobalState();

    return (
    <TasksStyled theme={theme}>
        <CreateContent />
    </TasksStyled>
    )
}

const TasksStyled = styled.main`
    padding: 2rem;
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
    height: 100%;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }
`;