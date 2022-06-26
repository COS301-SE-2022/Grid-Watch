/*
  Warnings:

  - You are about to drop the column `techteamId` on the `techteamticket` table. All the data in the column will be lost.
  - Added the required column `techTeamId` to the `techteamticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "techteamticket" DROP COLUMN "techteamId",
ADD COLUMN     "techTeamId" INTEGER NOT NULL;
