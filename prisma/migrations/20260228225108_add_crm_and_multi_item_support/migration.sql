/*
  Warnings:

  - You are about to drop the column `customerName` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `order` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_serviceId_fkey`;

-- DropIndex
DROP INDEX `Order_serviceId_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `customerName`,
    DROP COLUMN `customerPhone`,
    DROP COLUMN `serviceId`,
    DROP COLUMN `weight`,
    ADD COLUMN `customerId` INTEGER NOT NULL,
    ADD COLUMN `dueDate` DATETIME(3) NULL,
    ADD COLUMN `paymentMethod` ENUM('CASH', 'QRIS', 'TRANSFER', 'DEBIT') NULL,
    ADD COLUMN `paymentStatus` ENUM('UNPAID', 'PAID', 'PARTIAL') NOT NULL DEFAULT 'UNPAID';

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `address` TEXT NULL,
    `loyaltyPoints` INTEGER NOT NULL DEFAULT 0,
    `totalSpend` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Customer_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL DEFAULT 1,
    `price` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
