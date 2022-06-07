-- DropForeignKey
ALTER TABLE "picture" DROP CONSTRAINT "picture_ticket_ID_fkey";

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_ticket_ID_fkey" FOREIGN KEY ("ticket_ID") REFERENCES "ticket"("ticket_id") ON DELETE CASCADE ON UPDATE CASCADE;
