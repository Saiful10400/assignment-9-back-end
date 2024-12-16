/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "logo" TEXT NOT NULL DEFAULT 'logo.url';

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");
