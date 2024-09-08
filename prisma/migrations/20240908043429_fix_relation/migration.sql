/*
  Warnings:

  - A unique constraint covering the columns `[facultyId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE appointment_id_seq;
ALTER TABLE "Appointment" ALTER COLUMN "id" SET DEFAULT nextval('appointment_id_seq');
ALTER SEQUENCE appointment_id_seq OWNED BY "Appointment"."id";

-- AlterTable
CREATE SEQUENCE doctor_id_seq;
ALTER TABLE "Doctor" ALTER COLUMN "id" SET DEFAULT nextval('doctor_id_seq');
ALTER SEQUENCE doctor_id_seq OWNED BY "Doctor"."id";

-- AlterTable
CREATE SEQUENCE faculty_id_seq;
ALTER TABLE "Faculty" ALTER COLUMN "id" SET DEFAULT nextval('faculty_id_seq');
ALTER SEQUENCE faculty_id_seq OWNED BY "Faculty"."id";

-- AlterTable
CREATE SEQUENCE patient_id_seq;
ALTER TABLE "Patient" ALTER COLUMN "id" SET DEFAULT nextval('patient_id_seq');
ALTER SEQUENCE patient_id_seq OWNED BY "Patient"."id";

-- AlterTable
CREATE SEQUENCE payment_id_seq;
ALTER TABLE "Payment" ALTER COLUMN "id" SET DEFAULT nextval('payment_id_seq');
ALTER SEQUENCE payment_id_seq OWNED BY "Payment"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_facultyId_key" ON "Doctor"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");
