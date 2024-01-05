'use client';
import React from 'react';
import { useGlobalState } from '../../context/GlobalProvider';
import Tasks from '../page';

export default function page() {
  const { completedTasks } = useGlobalState();
  console.log(completedTasks);

    return <Tasks title='Complete tasks' tasks={completedTasks} />
}
