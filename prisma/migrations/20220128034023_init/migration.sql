-- CreateTable
CREATE TABLE `Domains` (
    `id` VARCHAR(32) NOT NULL,
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `punycode` VARCHAR(255) NOT NULL,
    `type` ENUM('A', 'AAAA', 'CNAME') NOT NULL DEFAULT 'CNAME',
    `content` VARCHAR(255) NOT NULL DEFAULT '',
    `proxied` BOOLEAN NOT NULL DEFAULT true,
    `user` VARCHAR(32) NOT NULL DEFAULT '',
    `status` ENUM('PENDING', 'ACTIVE', 'DELETED', 'BANNED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Domains_name_key`(`name`),
    UNIQUE INDEX `Domains_punycode_key`(`punycode`),
    INDEX `Domains_no_idx`(`no`),
    INDEX `Domains_user_status_createdAt_idx`(`user`, `status`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emails` (
    `id` VARCHAR(32) NOT NULL,
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `punycode` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL DEFAULT '',
    `user` VARCHAR(32) NOT NULL DEFAULT '',
    `status` ENUM('PENDING', 'ACTIVE', 'DELETED', 'BANNED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Emails_name_key`(`name`),
    UNIQUE INDEX `Emails_punycode_key`(`punycode`),
    INDEX `Emails_no_idx`(`no`),
    INDEX `Emails_user_status_createdAt_idx`(`user`, `status`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
