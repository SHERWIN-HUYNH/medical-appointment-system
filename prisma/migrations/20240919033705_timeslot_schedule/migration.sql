/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `TimeSlot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_scheduleId_fkey";

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "scheduleId";

-- CreateTable
CREATE TABLE "SheduleTimeSlot" (
    "scheduleId" INTEGER NOT NULL,
    "timeSlotsId" INTEGER NOT NULL,

    CONSTRAINT "SheduleTimeSlot_pkey" PRIMARY KEY ("scheduleId","timeSlotsId")
);

-- AddForeignKey
ALTER TABLE "SheduleTimeSlot" ADD CONSTRAINT "SheduleTimeSlot_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SheduleTimeSlot" ADD CONSTRAINT "SheduleTimeSlot_timeSlotsId_fkey" FOREIGN KEY ("timeSlotsId") REFERENCES "TimeSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
