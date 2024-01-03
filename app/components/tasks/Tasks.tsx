'use client';
import { useGlobalState } from '@/app/context/GlobalProvider';
import React from 'react';
import styled from 'styled-components';
import CreateContent from '../modals/CreateContent';
import TaskItem from '../TaskItem/TaskItem';

interface Props {
    title: string;
    tasks: any[];
}

export default function Tasks({ title, tasks }: Props) {
    const { theme } = useGlobalState();

    return (
        <TasksStyled theme={theme}>
            <h1>{title}</h1>
            <div className='tasks-grid'>
                {tasks.map((task) => (
                    <TaskItem 
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        date={task.date}
                        isCompleted={task.isCompleted}
                        isImportant={task.isImportant}
                        id={task.id}
                        />
                ))}
            </div>
        </TasksStyled>
    );
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
