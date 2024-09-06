/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Task_description_key";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Task_name_key" ON "Task"("name");
