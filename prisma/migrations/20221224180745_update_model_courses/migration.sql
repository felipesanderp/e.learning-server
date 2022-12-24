/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Courses` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Courses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Courses" ("createdAt", "description", "id", "imageURL", "slug", "title") SELECT "createdAt", "description", "id", "imageURL", "slug", "title" FROM "Courses";
DROP TABLE "Courses";
ALTER TABLE "new_Courses" RENAME TO "Courses";
CREATE UNIQUE INDEX "Courses_title_key" ON "Courses"("title");
CREATE UNIQUE INDEX "Courses_slug_key" ON "Courses"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
