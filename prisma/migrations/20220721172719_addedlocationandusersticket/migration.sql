/*
  Warnings:

  - Added the required column `ticketLat` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketLong` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketStreetAddress` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "ticketLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ticketLong" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ticketStreetAddress" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "ticketsUpvoted" INTEGER[];

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
