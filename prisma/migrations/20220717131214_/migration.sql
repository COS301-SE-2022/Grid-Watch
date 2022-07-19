/*
  Warnings:

  - You are about to drop the column `created` on the `authorizedofficials` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `techteam` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authorizedofficials" DROP COLUMN "created",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "techteam" DROP COLUMN "created",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
