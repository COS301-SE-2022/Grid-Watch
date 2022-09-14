/*
  Warnings:

  - You are about to drop the `ai` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ai";

-- CreateTable
CREATE TABLE "AI" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB,
    "fitness" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AI_pkey" PRIMARY KEY ("id")
);
