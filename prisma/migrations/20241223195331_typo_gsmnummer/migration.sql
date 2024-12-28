/*
  Warnings:

  - You are about to drop the column `gmsnummer` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "activeUntil" SET DEFAULT CURRENT_TIMESTAMP + interval '1 day';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gmsnummer",
ADD COLUMN     "gsmnummer" VARCHAR(255);
