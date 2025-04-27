/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "urls_id_key" ON "urls"("id");
