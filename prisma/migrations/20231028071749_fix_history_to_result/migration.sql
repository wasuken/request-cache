/*
  Warnings:

  - You are about to drop the `UrlInfoQueueHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UrlInfoQueueHistory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UrlInfoQueueResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlInfoId" INTEGER NOT NULL,
    "exec_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response" TEXT NOT NULL,
    "result" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UrlInfoQueueResult_urlInfoId_fkey" FOREIGN KEY ("urlInfoId") REFERENCES "UrlInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
