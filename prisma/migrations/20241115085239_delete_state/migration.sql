/*
  Warnings:

  - You are about to drop the column `amount` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Bill` table. All the data in the column will be lost.
  - Added the required column `price` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDeleted` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDeleted` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDeleted` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "amount",
DROP COLUMN "paymentMethod",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "gender" BOOLEAN NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL;
