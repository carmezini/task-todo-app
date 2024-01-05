import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/app/utils/connect";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req: Request, { params }: { params: { id: string }}) {
    try {
        const session = await getServerSession(authOptions);
        const { id } = params;

        if (session) {
            const task = await prisma.task.delete({
                where: {
                    id
                }
            })
            console.log('task deleted', task);
            return NextResponse.json(task);
        } else {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

    } catch (err) {
        console.log('Error deleting task', err);
        return NextResponse.json({ err: 'Error deleting task', status: 500 });
    }
}