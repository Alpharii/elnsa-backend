/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteCharacter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hobby` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoriteCharacter" DROP CONSTRAINT "FavoriteCharacter_personId_fkey";

-- DropForeignKey
ALTER TABLE "Hobby" DROP CONSTRAINT "Hobby_personId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "FavoriteCharacter";

-- DropTable
DROP TABLE "Hobby";

-- DropTable
DROP TABLE "Person";

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hobbies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "hobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_characters" (
    "id" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "favorite_characters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_username_key" ON "accounts"("username");

-- AddForeignKey
ALTER TABLE "hobbies" ADD CONSTRAINT "hobbies_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_characters" ADD CONSTRAINT "favorite_characters_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
