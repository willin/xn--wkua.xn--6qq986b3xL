-- DropIndex
DROP INDEX `Domains_name_key` ON `Domains`;

-- DropIndex
DROP INDEX `Domains_punycode_key` ON `Domains`;

-- DropIndex
DROP INDEX `Emails_name_key` ON `Emails`;

-- DropIndex
DROP INDEX `Emails_punycode_key` ON `Emails`;

-- CreateIndex
CREATE INDEX `Domains_name_punycode_idx` ON `Domains`(`name`, `punycode`);

-- CreateIndex
CREATE INDEX `Emails_name_punycode_idx` ON `Emails`(`name`, `punycode`);
