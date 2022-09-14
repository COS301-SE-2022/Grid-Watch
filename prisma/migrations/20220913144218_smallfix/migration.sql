/*
  Warnings:

  - You are about to drop the column `data` on the `AI` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AI" DROP COLUMN "data",
ADD COLUMN     "aiData" JSONB;
