/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContactToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actief` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adres` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familienaam` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gemeenteId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `huisnummer` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voornaam` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ContactToTag" DROP CONSTRAINT "_ContactToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContactToTag" DROP CONSTRAINT "_ContactToTag_B_fkey";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "activeUntil" SET DEFAULT CURRENT_TIMESTAMP + interval '1 day';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "actief" BOOLEAN NOT NULL,
ADD COLUMN     "adres" VARCHAR(255) NOT NULL,
ADD COLUMN     "familienaam" VARCHAR(255) NOT NULL,
ADD COLUMN     "gemeenteId" UUID NOT NULL,
ADD COLUMN     "gmsnummer" VARCHAR(255),
ADD COLUMN     "groepId" UUID,
ADD COLUMN     "huisnummer" VARCHAR(255) NOT NULL,
ADD COLUMN     "roleId" UUID,
ADD COLUMN     "schoolId" UUID NOT NULL,
ADD COLUMN     "voornaam" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Meeting";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ContactToTag";

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "naam" VARCHAR(255) NOT NULL,
    "gemeenteId" UUID NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gemeente" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "naam" VARCHAR(255) NOT NULL,
    "postcode" VARCHAR(255) NOT NULL,

    CONSTRAINT "Gemeente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groep" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "naam" VARCHAR(255) NOT NULL,

    CONSTRAINT "Groep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bericht" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "onderwerp" VARCHAR(255) NOT NULL,
    "bericht" TEXT NOT NULL,
    "verzondenOp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gelezen" BOOLEAN NOT NULL,
    "verzenderId" UUID NOT NULL,

    CONSTRAINT "Bericht_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foto" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" VARCHAR(255) NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gebruikerId" UUID NOT NULL,
    "beschrijving" VARCHAR(255),

    CONSTRAINT "Foto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BerichtToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BerichtToUser_AB_unique" ON "_BerichtToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BerichtToUser_B_index" ON "_BerichtToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gemeenteId_fkey" FOREIGN KEY ("gemeenteId") REFERENCES "Gemeente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groepId_fkey" FOREIGN KEY ("groepId") REFERENCES "Groep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_gemeenteId_fkey" FOREIGN KEY ("gemeenteId") REFERENCES "Gemeente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bericht" ADD CONSTRAINT "Bericht_verzenderId_fkey" FOREIGN KEY ("verzenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_gebruikerId_fkey" FOREIGN KEY ("gebruikerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BerichtToUser" ADD CONSTRAINT "_BerichtToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Bericht"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BerichtToUser" ADD CONSTRAINT "_BerichtToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
