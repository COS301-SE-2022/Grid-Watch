-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordSalt" TEXT,
    "name" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userRating" INTEGER NOT NULL DEFAULT 50,
    "ticketsUpvoted" INTEGER[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "ticketId" SERIAL NOT NULL,
    "ticketStatus" TEXT NOT NULL,
    "ticketCreateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketCloseDate" TIMESTAMP(3),
    "ticketType" TEXT NOT NULL,
    "ticketStreetAddress" TEXT,
    "ticketCity" TEXT NOT NULL,
    "ticketLocation" TEXT,
    "ticketLong" DOUBLE PRECISION,
    "ticketLat" DOUBLE PRECISION,
    "ticketCost" DOUBLE PRECISION,
    "ticketDescription" TEXT NOT NULL,
    "ticketRepairTime" INTEGER,
    "ticketUpvotes" INTEGER NOT NULL,
    "currentSubtask" INTEGER,
    "assignedTechTeam" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "picture" (
    "pictureId" SERIAL NOT NULL,
    "pictureLink" TEXT NOT NULL,
    "ticketID" INTEGER NOT NULL,

    CONSTRAINT "picture_pkey" PRIMARY KEY ("pictureId")
);

-- CreateTable
CREATE TABLE "subtasks" (
    "subtaskId" SERIAL NOT NULL,
    "ticketID" INTEGER NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "taskStep" INTEGER NOT NULL,
    "taskStatus" TEXT NOT NULL,

    CONSTRAINT "subtasks_pkey" PRIMARY KEY ("subtaskId")
);

-- CreateTable
CREATE TABLE "techteam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "specialisation" TEXT[],
    "contactNumber" VARCHAR(10) NOT NULL,
    "cities" TEXT[],
    "nrJobsCompleted" INTEGER,
    "ratingOfJobs" DOUBLE PRECISION,
    "password" TEXT NOT NULL,
    "passwordSalt" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "techteam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorizedofficials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" VARCHAR(10) NOT NULL,
    "cities" TEXT[],
    "password" TEXT NOT NULL,
    "passwordSalt" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authorizedofficials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AI" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aiData" JSONB,
    "fitness" DOUBLE PRECISION NOT NULL,
    "ticketTypes" TEXT[],
    "ticketCities" TEXT[],
    "aiType" TEXT NOT NULL,

    CONSTRAINT "AI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "techteam_email_key" ON "techteam"("email");

-- CreateIndex
CREATE UNIQUE INDEX "techteam_contactNumber_key" ON "techteam"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "authorizedofficials_email_key" ON "authorizedofficials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "authorizedofficials_contactNumber_key" ON "authorizedofficials"("contactNumber");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_assignedTechTeam_fkey" FOREIGN KEY ("assignedTechTeam") REFERENCES "techteam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_ticketID_fkey" FOREIGN KEY ("ticketID") REFERENCES "ticket"("ticketId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_ticketID_fkey" FOREIGN KEY ("ticketID") REFERENCES "ticket"("ticketId") ON DELETE CASCADE ON UPDATE CASCADE;
