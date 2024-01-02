'use client';
import Tasks from './components/tasks/Tasks';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <Tasks />
        </main>
    );
}
