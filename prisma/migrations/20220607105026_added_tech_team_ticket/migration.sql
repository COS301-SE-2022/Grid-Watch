/*
  Warnings:

  - You are about to drop the column `picture_encoded` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_ID` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_img` on the `ticket` table. All the data in the column will be lost.
  - Added the required column `picture_link` to the `picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_id` to the `picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "picture" DROP CONSTRAINT "picture_ticket_ID_fkey";

-- DropIndex
DROP INDEX "ticket_ticket_img_key";

-- AlterTable
ALTER TABLE "picture" DROP COLUMN "picture_encoded",
DROP COLUMN "ticket_ID",
ADD COLUMN     "picture_link" TEXT NOT NULL,
ADD COLUMN     "ticket_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "ticket_img";

-- CreateTable
CREATE TABLE "techteamticket" (
    "id" SERIAL NOT NULL,
    "techteam_ID" INTEGER NOT NULL,
    "ticket_ID" INTEGER NOT NULL,

    CONSTRAINT "techteamticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("ticket_id") ON DELETE CASCADE ON UPDATE CASCADE;
