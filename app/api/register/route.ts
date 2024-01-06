import prisma from '@/app/utils/connect';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, email, password } = body;
        console.log(username, email, password);
		
        if (!username || !email || !password) {
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

        const user = await prisma.user.create({
            data: { email, username, hashedPassword },
        });

        return NextResponse.json(user);

    } catch (error) {
        console.log('ERROR CREATING USER: ', error);
        return NextResponse.json({ error: 'Error creating user', status: 500 });
    }
}
