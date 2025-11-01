/*
  Warnings:

  - You are about to alter the column `price` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `items` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `image` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_name` VARCHAR(191) NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `status` ENUM('finish', 'pending', 'cancelled') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `transaction_id` VARCHAR(191) NOT NULL,
    `payment_method` ENUM('qris', 'virtualaccount', 'ewallet') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` ENUM('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'pending',
    `paid_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Payment_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
