import { db } from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const musicCollections = await db.musicCollection.findMany({
      where: {
        user: {
          email: session.user.email, // Assuming you're identifying the user by email
        },
      },
    });
    return NextResponse.json(musicCollections);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch music collections' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { voice, music, purpose, voiceData, musicGenre, purposeGenre } = await request.json();

  if (!voice || !music || !voiceData) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const newMusicCollection = await db.musicCollection.create({
      data: {
        voice,
        music,
        voiceData,
        purpose,
        musicGenre,
        purposeGenre,
        user: {
          connect: { email: session.user.email }, // Assuming you're identifying the user by email
        },
      },
    });
    return NextResponse.json(newMusicCollection);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to add music collection' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json(); // Expecting an `id` to identify the collection to delete

  if (!id) {
    return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
  }

  try {
    // Find and delete the music collection
    const deletedMusicCollection = await db.musicCollection.delete({
      where: {
        id: id, // Use the provided ID
      },
    });
    
    return NextResponse.json(deletedMusicCollection);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to delete music collection' }, { status: 500 });
  }
}