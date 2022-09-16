/*
  Warnings:

  - Added the required column `aiType` to the `AI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AI" ADD COLUMN     "aiType" TEXT NOT NULL;
