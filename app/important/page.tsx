'use client';
import React from 'react';
import { useGlobalState } from '../context/GlobalProvider';
import Tasks from '../components/tasks/page';

export default function page() {
    const { importantTasks } = useGlobalState();

    return <Tasks title='Important Tasks' tasks={importantTasks} />;
}
