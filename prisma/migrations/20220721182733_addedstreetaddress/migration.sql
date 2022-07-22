/*
  Warnings:

  - Made the column `ticketCity` on table `ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ticket" ALTER COLUMN "ticketCity" SET NOT NULL,
ALTER COLUMN "ticketLocation" DROP NOT NULL,
ALTER COLUMN "ticketLat" DROP NOT NULL,
ALTER COLUMN "ticketLong" DROP NOT NULL;
