/*
  Warnings:

  - You are about to drop the `AI` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AI";

-- CreateTable
CREATE TABLE "ai" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB,
    "fitness" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ai_pkey" PRIMARY KEY ("id")
);
