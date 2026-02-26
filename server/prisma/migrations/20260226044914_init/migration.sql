-- CreateTable
CREATE TABLE `tbl_mas_users` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserCode` VARCHAR(20) NOT NULL,
    `UserName` VARCHAR(150) NULL,
    `UserEmail` VARCHAR(150) NOT NULL,
    `Password` VARCHAR(150) NOT NULL,
    `FirstName` VARCHAR(150) NOT NULL,
    `LastName` VARCHAR(150) NOT NULL,
    `Address` TEXT NULL,
    `Tel` VARCHAR(20) NULL,
    `Profile_Image` TEXT NOT NULL,
    `Upload_Image` TEXT NULL,
    `CreateBy` VARCHAR(20) NOT NULL,
    `CreateDateTime` DATETIME(0) NOT NULL,
    `UpdateBy` VARCHAR(20) NOT NULL,
    `UpdateDateTime` DATETIME(0) NOT NULL,
    `TokenVersion` INTEGER NOT NULL DEFAULT 0,
    `Upload_Image_Id` TEXT NULL,

    UNIQUE INDEX `tbl_mas_users_UserCode_key`(`UserCode`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_trs_product_header` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductCode` VARCHAR(150) NOT NULL,
    `ProductName` VARCHAR(255) NOT NULL,
    `ProductDes` TEXT NOT NULL,
    `CreateBy` VARCHAR(20) NOT NULL,
    `CreateDateTime` DATETIME(0) NOT NULL,
    `UpdateBy` VARCHAR(20) NOT NULL,
    `UpdateDateTime` DATETIME(0) NOT NULL,

    UNIQUE INDEX `tbl_trs_product_header_ProductCode_key`(`ProductCode`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_trs_product_image` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `IdRef` INTEGER NOT NULL,
    `ImageType` VARCHAR(50) NOT NULL,
    `ProductImage` TEXT NOT NULL,
    `ProductImageId` TEXT NULL,
    `CreateBy` VARCHAR(20) NOT NULL,
    `CreateDateTime` DATE NOT NULL,
    `UpdateBy` VARCHAR(20) NOT NULL,
    `UpdateDateTime` DATE NOT NULL,

    INDEX `tbl_trs_product_image_IdRef_fkey`(`IdRef`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_trs_product_line` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `IdRef` INTEGER NOT NULL,
    `LineNo` INTEGER NOT NULL,
    `Size` VARCHAR(150) NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `Amount` INTEGER NOT NULL,
    `Note` TEXT NULL,
    `CreateBy` VARCHAR(20) NOT NULL,
    `CreateDateTime` DATETIME(0) NOT NULL,
    `UpdateBy` VARCHAR(20) NOT NULL,
    `UpdateDateTime` DATETIME(0) NOT NULL,

    INDEX `tbl_trs_product_line_IdRef_fkey`(`IdRef`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `token` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `TokenHash` VARCHAR(255) NOT NULL,
    `ExpiresAt` DATETIME(0) NOT NULL,
    `AbsoluteExp` DATETIME(0) NOT NULL,
    `CreateBy` VARCHAR(20) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Token_UserId_idx`(`UserId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_trs_product_image` ADD CONSTRAINT `tbl_trs_product_image_IdRef_fkey` FOREIGN KEY (`IdRef`) REFERENCES `tbl_trs_product_header`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_trs_product_line` ADD CONSTRAINT `tbl_trs_product_line_IdRef_fkey` FOREIGN KEY (`IdRef`) REFERENCES `tbl_trs_product_header`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `Token_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `tbl_mas_users`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
