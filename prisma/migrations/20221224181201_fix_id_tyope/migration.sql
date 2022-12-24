/*
  Warnings:

  - The primary key for the `Courses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
