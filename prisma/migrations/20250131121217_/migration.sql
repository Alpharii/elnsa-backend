/*
  Warnings:

  - You are about to drop the column `accountId` on the `persons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "persons" DROP CONSTRAINT "persons_accountId_fkey";

-- DropIndex
DROP INDEX "persons_accountId_key";

-- AlterTable
ALTER TABLE "persons" DROP COLUMN "accountId";
