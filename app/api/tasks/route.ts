import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import prisma from "@/app/utils/connect";

export async function POST(req: Request, res: Response) {
    try {
        const session = await getSession();
        console.log(session, 'session')

        if (!session || !session.user) {
            return NextResponse.json({ error: "UNAUTHORIZED", status: 401 });
        }

        const { title, description, date, completed, important } = await req.json();

        if (!title || !description || !date || !completed) {
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
                userId: session.user.id
            }
        });

        return NextResponse.json(task);

    } catch (err) {
        console.log('Error creating task', err);
        return NextResponse.json({err: 'Error creating task', status: 500});
    }
}

export async function GET(req: Request) {
    try {
        const session = await getSession({ });
        const userId = session?.user.id;

        if (!userId) {
            return NextResponse.json({ error: "UNAUTHORIZED", status: 401 });
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId
            }
        });

        return NextResponse.json(tasks);

    } catch (err) {
        console.log('Error getting tasks', err);
        return NextResponse.json({err: 'Error getting tasks', status: 500});
    }
}

export async function PUT(req: Request) {
    try {

    } catch (err) {
        console.log('Error updating tasks', err);
        return NextResponse.json({err: 'Error creating task', status: 500});
    }
}

export async function DELETE(req: Request) {
    try {

    } catch (err) {
        console.log('Error deleting tasks', err);
        return NextResponse.json({err: 'Error creating task', status: 500});
    }
}