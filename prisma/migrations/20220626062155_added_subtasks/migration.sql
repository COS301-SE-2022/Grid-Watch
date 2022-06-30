-- CreateTable
CREATE TABLE "subtasks" (
    "subtaskId" SERIAL NOT NULL,
    "ticketID" INTEGER NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "taskStep" TEXT NOT NULL,
    "taskStatus" TEXT NOT NULL,

    CONSTRAINT "subtasks_pkey" PRIMARY KEY ("subtaskId")
);

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_ticketID_fkey" FOREIGN KEY ("ticketID") REFERENCES "ticket"("ticketId") ON DELETE CASCADE ON UPDATE CASCADE;
