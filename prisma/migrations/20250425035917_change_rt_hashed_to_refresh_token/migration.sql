/*
  Warnings:

  - You are about to drop the column `refresh_token_hashed` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "refresh_token_hashed",
ADD COLUMN     "refresh_token" TEXT;
