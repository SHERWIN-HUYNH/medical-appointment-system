/*
  Warnings:

  - You are about to drop the column `reason` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `symptom` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "reason";

-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "isDeleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Faculty" ALTER COLUMN "isDeleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "symptom" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "isDeleted" SET DEFAULT false;
