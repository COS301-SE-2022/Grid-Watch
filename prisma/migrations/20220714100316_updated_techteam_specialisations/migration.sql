/*
  Warnings:

  - The `specialisation` column on the `techteam` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `assigned_TechTeam` on the `ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_assigned_TechTeam_fkey";

-- AlterTable
ALTER TABLE "techteam" DROP COLUMN "specialisation",
ADD COLUMN     "specialisation" TEXT[];

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "assigned_TechTeam";
