import { db } from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log(req)
//   const session = await getSession({ req });

//   if (!session || !session.user) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   if (req.method === 'GET') {
//     try {
//       const musicCollections = await db.musicCollection.findMany({
//         where: {
//           user: {
//             email: session.user.email,
//           },
//         },
//       });
//       return res.status(200).json(musicCollections);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Failed to fetch music collections' });
//     }
//   }

//   if (req.method === 'POST') {
//     const { voice, music, purpose } = req.body;

//     if (!voice || !music || !purpose) {
//       return res.status(400).json({ message: 'Missing fields' });
//     }

//     try {
//       const newMusicCollection = await db.musicCollection.create({
//         data: {
//           voice,
//           music,
//           purpose,
//           user: {
//             connect: { email: session.user.email },
//           },
//         },
//       });
//       return res.status(200).json(newMusicCollection);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Failed to add music collection' });
//     }
//   }

//   return res.status(405).json({ message: 'Method not allowed' });
// }

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

  const { voice, music, purpose, voiceData } = await request.json();

  if (!voice || !music || !purpose || !voiceData) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const newMusicCollection = await db.musicCollection.create({
      data: {
        voice,
        music,
        voiceData,
        purpose,
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