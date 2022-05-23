-- CreateTable
CREATE TABLE "ticket" (
    "ticket_id" SERIAL NOT NULL,
    "ticket_status" TEXT NOT NULL,
    "ticket_create_date" TIMESTAMP(3) NOT NULL,
    "ticket_close_date" TIMESTAMP(3),
    "ticket_type" TEXT NOT NULL,
    "ticket_city" TEXT,
    "ticket_location" TEXT NOT NULL,
    "ticket_cost" DOUBLE PRECISION,
    "ticket_description" TEXT NOT NULL,
    "ticket_repair_time" INTEGER,
    "ticket_upvotes" INTEGER NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "picture_id" TEXT NOT NULL,
    "picture_encoded" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("picture_id")
);

-- CreateTable
CREATE TABLE "techteam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "specialisation" TEXT NOT NULL,
    "contact_number" VARCHAR(10) NOT NULL,
    "nr_jobs_completed" INTEGER,
    "rating_of_jobs" DOUBLE PRECISION,

    CONSTRAINT "techteam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorizedofficials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact_number" VARCHAR(10) NOT NULL,
    "cities" TEXT NOT NULL,

    CONSTRAINT "authorizedofficials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "techteam_email_key" ON "techteam"("email");

-- CreateIndex
CREATE UNIQUE INDEX "techteam_contact_number_key" ON "techteam"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "authorizedofficials_email_key" ON "authorizedofficials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "authorizedofficials_contact_number_key" ON "authorizedofficials"("contact_number");
