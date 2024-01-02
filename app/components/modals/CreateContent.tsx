'use client';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function CreateContent() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);

    const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (name) {
            case 'title':
                setTitle(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            case 'date':
                setDate(e.target.value);
                break;
            case 'completed':
                setCompleted(e.target.checked);
                break;
            case 'important':
                setImportant(e.target.checked);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const task = {
            title: title,
            description: description,
            date: date,
            completed: completed,
            important: important,
        }

        try {
            const res = await axios.post('/api/tasks', task);

            if (res.data.error) {
                toast.error(res.data.error);
            }

            toast.success('Task created successfully!');

        } catch (err) {
            toast.error('Something went wrong');
            console.log(err);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Create a task</h1>
            <div className='input-control'>
                <label htmlFor='title'>Title</label>
                <input id='title' type='text' value={title} onChange={handleChange('title')} placeholder='What u need to be done?' />
            </div>
            <div className='input-control'>
                <label htmlFor='description'>Description</label>
                <input id='description' type='text' value={description} onChange={handleChange('description')} placeholder='' />
            </div>
            <div className='input-control'>
                <label htmlFor='date'>Date</label>
                <input id='date' type='date' value={date} onChange={handleChange('date')} placeholder='' />
            </div>
            <div className='input-control'>
                <label htmlFor='completed'>Completed</label>
                <input id='completed' type='checkbox' value={completed.toString()} onChange={handleChange('completed')} placeholder='' />
            </div>
            <div className='input-control'>
                <label htmlFor='important'>Important</label>
                <input id='important' type='checkbox' value={important.toString()} onChange={handleChange('important')} placeholder='' />
            </div>
            <div className="submit-btn">
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    </div>
  )
}
