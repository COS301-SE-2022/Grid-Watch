/*
  Warnings:

  - The `aiParameters` column on the `AI` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AI" ADD COLUMN     "aiArrays" JSONB,
DROP COLUMN "aiParameters",
ADD COLUMN     "aiParameters" TEXT[];
