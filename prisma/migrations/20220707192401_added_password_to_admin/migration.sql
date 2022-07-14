/*
  Warnings:

  - The `cities` column on the `authorizedofficials` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "authorizedofficials" DROP COLUMN "cities",
ADD COLUMN     "cities" TEXT[];
