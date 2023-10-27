/*
  Warnings:

  - You are about to drop the `url_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "url_info";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UrlInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "get_timing_sec" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UrlInfoQueue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlInfoId" INTEGER NOT NULL,
    "exec_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UrlInfoQueue_urlInfoId_fkey" FOREIGN KEY ("urlInfoId") REFERENCES "UrlInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UrlInfoQueueHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlInfoId" INTEGER NOT NULL,
    "exec_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response" TEXT NOT NULL,
    "result" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UrlInfoQueueHistory_urlInfoId_fkey" FOREIGN KEY ("urlInfoId") REFERENCES "UrlInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
