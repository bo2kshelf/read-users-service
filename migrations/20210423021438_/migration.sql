-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `uniqueName` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
UNIQUE INDEX `User.uniqueName_unique`(`uniqueName`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
