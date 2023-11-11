-- DropForeignKey
ALTER TABLE `UrlInfoQueue` DROP FOREIGN KEY `UrlInfoQueue_urlInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `UrlInfoQueueResult` DROP FOREIGN KEY `UrlInfoQueueResult_urlInfoId_fkey`;

-- AddForeignKey
ALTER TABLE `UrlInfoQueue` ADD CONSTRAINT `UrlInfoQueue_urlInfoId_fkey` FOREIGN KEY (`urlInfoId`) REFERENCES `UrlInfo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UrlInfoQueueResult` ADD CONSTRAINT `UrlInfoQueueResult_urlInfoId_fkey` FOREIGN KEY (`urlInfoId`) REFERENCES `UrlInfo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
