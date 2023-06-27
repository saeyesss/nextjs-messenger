import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }
    // Get the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!conversation) {
      return NextResponse.json(conversation);
    }

    // Update seen of lastMessage

    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      data: {
        seen: { connect: { id: currentUser.id } },
      },
      include: { sender: true, seen: true },
    });
    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES_SEEN');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
