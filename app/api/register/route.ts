import prisma from '@/app/utils/connect';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;
        console.log(name, email, password);
		
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields", status: 400 });
        }

        const exist = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (exist) {
			return NextResponse.json({ error: "User already exists", status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await prisma.user.create({
            data: { email, hashedPassword, name },
        });

        return NextResponse.json(createdUser);

    } catch (error) {
        console.log('ERROR CREATING USER: ', error);
        return NextResponse.json({ error: 'Error creating user', status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;
        //@ts-ignore


        const exist = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (exist) {
			return NextResponse.json(exist);
        }


    } catch (err) {
        console.log('Error getting tasks', err);
        return NextResponse.json({ err: 'Error getting tasks', status: 500 });
    }
}