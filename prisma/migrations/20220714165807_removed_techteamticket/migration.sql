/*
  Warnings:

  - You are about to drop the `techteamticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "assignedTechTeam" INTEGER;

-- DropTable
DROP TABLE "techteamticket";

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_assignedTechTeam_fkey" FOREIGN KEY ("assignedTechTeam") REFERENCES "techteam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
