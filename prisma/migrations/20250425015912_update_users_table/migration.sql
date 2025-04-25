/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `users` table. All the data in the column will be lost.
  - Added the required column `password_hashed` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token_hashed` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "token",
ADD COLUMN     "password_hashed" TEXT NOT NULL,
ADD COLUMN     "refresh_token_hashed" TEXT NOT NULL;
