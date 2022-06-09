-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "assigned_TechTeam" INTEGER;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_assigned_TechTeam_fkey" FOREIGN KEY ("assigned_TechTeam") REFERENCES "techteam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
