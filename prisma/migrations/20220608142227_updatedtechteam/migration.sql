/*
  Warnings:

  - Added the required column `created` to the `authorizedofficials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `authorizedofficials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `techteam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `techteam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authorizedofficials" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "passwordSalt" TEXT;

-- AlterTable
ALTER TABLE "techteam" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "passwordSalt" TEXT;

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordSalt" TEXT,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
