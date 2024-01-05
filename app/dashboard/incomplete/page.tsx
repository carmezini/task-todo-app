'use client';
import React from 'react';
import { useGlobalState } from '../../context/GlobalProvider';
import Tasks from '../page';

export default function page() {

	const { incompleteTasks } = useGlobalState();

    return <Tasks title='To do' tasks={incompleteTasks} />
}
