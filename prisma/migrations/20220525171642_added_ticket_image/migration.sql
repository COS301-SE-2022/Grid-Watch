/*
  Warnings:

  - A unique constraint covering the columns `[ticket_img]` on the table `ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticket_img` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "ticket_img" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ticket_ticket_img_key" ON "ticket"("ticket_img");
