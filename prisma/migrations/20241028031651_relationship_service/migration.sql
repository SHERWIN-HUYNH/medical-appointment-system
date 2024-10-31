/*
  Warnings:

  - Added the required column `facultyId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "note" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "birthDate" DROP NOT NULL,
ALTER COLUMN "allergies" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "facultyId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_stripeCustomerId_key" ON "StripeCustomer"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
