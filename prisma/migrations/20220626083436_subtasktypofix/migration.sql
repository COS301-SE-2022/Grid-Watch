/*
  Warnings:

  - Changed the type of `taskStep` on the `subtasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "subtasks" DROP COLUMN "taskStep",
ADD COLUMN     "taskStep" INTEGER NOT NULL;
