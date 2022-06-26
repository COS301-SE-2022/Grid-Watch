/*
  Warnings:

  - You are about to drop the column `created` on the `authorizedofficials` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `authorizedofficials` table. All the data in the column will be lost.
  - You are about to drop the column `passwordSalt` on the `authorizedofficials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authorizedofficials" DROP COLUMN "created",
DROP COLUMN "password",
DROP COLUMN "passwordSalt";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "created" DROP DEFAULT;
