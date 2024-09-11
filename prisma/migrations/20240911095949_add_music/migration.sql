-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64),
    "email" VARCHAR(64),
    "password" VARCHAR(64),
    "language" VARCHAR(64),
    "say_name" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicCollection" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "voice" TEXT NOT NULL,
    "music" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MusicCollection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MusicCollection" ADD CONSTRAINT "MusicCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
