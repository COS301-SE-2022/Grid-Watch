-- CreateTable
CREATE TABLE "AI" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB,
    "fitness" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AI_pkey" PRIMARY KEY ("id")
);
