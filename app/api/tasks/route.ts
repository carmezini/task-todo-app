import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/utils/connect';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        //@ts-ignore
        const userId = session?.id;

        if (!session || !session.user) {
            return NextResponse.json({ error: 'UNAUTHORIZED', status: 401 });
        }

        const { title, description, date, completed, important } =
            await req.json();

        if (!title || !description || !date) {
            return NextResponse.json({ error: "BAD_REQUEST", status: 400 });
        }

        if (title.length < 3) {
            return NextResponse.json({ error: "Title must be at least 3 characters long", status: 400 });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId,
            },
        });

        return NextResponse.json(task);
    
    } catch (error) {
        console.log('ERROR CREATING TASK: ', error);
        return NextResponse.json({ error: 'Error creating task', status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        //@ts-ignore
        const userId = session?.id;

        if (!userId) {
            return NextResponse.json({ error: 'UNAUTHORIZED', status: 401 });
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId,
            },
        });

        return NextResponse.json(tasks);
    } catch (err) {
        console.log('Error getting tasks', err);
        return NextResponse.json({ err: 'Error getting tasks', status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
    } catch (err) {
        console.log('Error updating tasks', err);
        return NextResponse.json({ err: 'Error creating task', status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
    } catch (err) {
        console.log('Error deleting tasks', err);
        return NextResponse.json({ err: 'Error creating task', status: 500 });
    }
}
