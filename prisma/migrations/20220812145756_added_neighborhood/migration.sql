/*
  Warnings:

  - Added the required column `neighborhood` to the `operatorAddresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `operatorAddresses` ADD COLUMN `neighborhood` VARCHAR(191) NOT NULL;
