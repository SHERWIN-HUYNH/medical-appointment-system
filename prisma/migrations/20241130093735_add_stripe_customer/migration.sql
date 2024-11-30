/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlots` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `StripeCustomer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stripeCustomerId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'DOCTOR';

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "date",
DROP COLUMN "note",
DROP COLUMN "timeSlots",
ADD COLUMN     "stripeCustomerId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- DropTable
DROP TABLE "StripeCustomer";
