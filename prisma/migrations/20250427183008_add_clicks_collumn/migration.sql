/*
  Warnings:

  - Added the required column `clicks` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "urls" ADD COLUMN     "clicks" INTEGER NOT NULL;
