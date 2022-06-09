/*
  Warnings:

  - Added the required column `password` to the `authorizedofficials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `techteam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authorizedofficials" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "passwordSalt" TEXT;

-- AlterTable
ALTER TABLE "techteam" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "passwordSalt" TEXT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP;
