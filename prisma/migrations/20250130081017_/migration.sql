/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `persons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `persons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "accountId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "persons_accountId_key" ON "persons"("accountId");

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
