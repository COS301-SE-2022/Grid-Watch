/*
  Warnings:

  - You are about to drop the column `contact_number` on the `authorizedofficials` table. All the data in the column will be lost.
  - The primary key for the `picture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `picture_id` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `picture_link` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_id` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `contact_number` on the `techteam` table. All the data in the column will be lost.
  - You are about to drop the column `nr_jobs_completed` on the `techteam` table. All the data in the column will be lost.
  - You are about to drop the column `rating_of_jobs` on the `techteam` table. All the data in the column will be lost.
  - You are about to drop the column `techteam_ID` on the `techteamticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_ID` on the `techteamticket` table. All the data in the column will be lost.
  - The primary key for the `ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ticket_city` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_close_date` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_cost` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_create_date` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_description` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_id` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_location` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_repair_time` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_status` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_type` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_upvotes` on the `ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contactNumber]` on the table `authorizedofficials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNumber]` on the table `techteam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactNumber` to the `authorizedofficials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureLink` to the `picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketID` to the `picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `techteam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `techteamId` to the `techteamticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketId` to the `techteamticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketCreateDate` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketDescription` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketLocation` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketStatus` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketType` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketUpvotes` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "picture" DROP CONSTRAINT "picture_ticket_id_fkey";

-- DropIndex
DROP INDEX "authorizedofficials_contact_number_key";

-- DropIndex
DROP INDEX "techteam_contact_number_key";

-- AlterTable
ALTER TABLE "authorizedofficials" DROP COLUMN "contact_number",
ADD COLUMN     "contactNumber" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "picture" DROP CONSTRAINT "picture_pkey",
DROP COLUMN "picture_id",
DROP COLUMN "picture_link",
DROP COLUMN "ticket_id",
ADD COLUMN     "pictureId" SERIAL NOT NULL,
ADD COLUMN     "pictureLink" TEXT NOT NULL,
ADD COLUMN     "ticketID" INTEGER NOT NULL,
ADD CONSTRAINT "picture_pkey" PRIMARY KEY ("pictureId");

-- AlterTable
ALTER TABLE "techteam" DROP COLUMN "contact_number",
DROP COLUMN "nr_jobs_completed",
DROP COLUMN "rating_of_jobs",
ADD COLUMN     "contactNumber" VARCHAR(10) NOT NULL,
ADD COLUMN     "nrJobsCompleted" INTEGER,
ADD COLUMN     "ratingOfJobs" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "techteamticket" DROP COLUMN "techteam_ID",
DROP COLUMN "ticket_ID",
ADD COLUMN     "techteamId" INTEGER NOT NULL,
ADD COLUMN     "ticketId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_pkey",
DROP COLUMN "ticket_city",
DROP COLUMN "ticket_close_date",
DROP COLUMN "ticket_cost",
DROP COLUMN "ticket_create_date",
DROP COLUMN "ticket_description",
DROP COLUMN "ticket_id",
DROP COLUMN "ticket_location",
DROP COLUMN "ticket_repair_time",
DROP COLUMN "ticket_status",
DROP COLUMN "ticket_type",
DROP COLUMN "ticket_upvotes",
ADD COLUMN     "ticketCity" TEXT,
ADD COLUMN     "ticketCloseDate" TIMESTAMP(3),
ADD COLUMN     "ticketCost" DOUBLE PRECISION,
ADD COLUMN     "ticketCreateDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ticketDescription" TEXT NOT NULL,
ADD COLUMN     "ticketId" SERIAL NOT NULL,
ADD COLUMN     "ticketLocation" TEXT NOT NULL,
ADD COLUMN     "ticketRepairTime" INTEGER,
ADD COLUMN     "ticketStatus" TEXT NOT NULL,
ADD COLUMN     "ticketType" TEXT NOT NULL,
ADD COLUMN     "ticketUpvotes" INTEGER NOT NULL,
ADD CONSTRAINT "ticket_pkey" PRIMARY KEY ("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "authorizedofficials_contactNumber_key" ON "authorizedofficials"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "techteam_contactNumber_key" ON "techteam"("contactNumber");

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_ticketID_fkey" FOREIGN KEY ("ticketID") REFERENCES "ticket"("ticketId") ON DELETE CASCADE ON UPDATE CASCADE;
