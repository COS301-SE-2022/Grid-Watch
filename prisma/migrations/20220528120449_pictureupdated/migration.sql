/*
  Warnings:

  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Picture";

-- CreateTable
CREATE TABLE "picture" (
    "picture_id" SERIAL NOT NULL,
    "picture_encoded" TEXT NOT NULL,
    "ticket_ID" INTEGER NOT NULL,

    CONSTRAINT "picture_pkey" PRIMARY KEY ("picture_id")
);

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_ticket_ID_fkey" FOREIGN KEY ("ticket_ID") REFERENCES "ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;
