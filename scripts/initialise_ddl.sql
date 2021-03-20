CREATE DATABASE `grip_invest` /*!40100 DEFAULT CHARACTER SET latin1 */;

CREATE TABLE `user_details` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `phoneNumber` int(10) NOT NULL,
  `pan` varchar(11) NOT NULL,
  `walletId` int(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phoneNumber_UNIQUE` (`phoneNumber`),
  UNIQUE KEY `panNumber_UNIQUE` (`pan`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `walletId_UNIQUE` (`walletId`),
  CONSTRAINT `fk_user_wallet` FOREIGN KEY (`walletId`) REFERENCES `wallet` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

CREATE TABLE `wallet` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(45) DEFAULT NULL,
  `createdBy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_wallet_user_idx` (`userId`),
  CONSTRAINT `fk_wallet_user` FOREIGN KEY (`userId`) REFERENCES `user_details` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

CREATE TABLE `transactions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL,
  `amount` int(10) DEFAULT NULL,
  `walletId` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `refrence` text,
  `status` varchar(7) DEFAULT NULL,
  `reason` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdBy` varchar(45) DEFAULT NULL,
  `updatedBy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_transaction_wallet_idx` (`walletId`),
  KEY `fk_transaction_user_idx` (`userId`),
  CONSTRAINT `fk_transaction_user` FOREIGN KEY (`userId`) REFERENCES `user_details` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_wallet` FOREIGN KEY (`walletId`) REFERENCES `wallet` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

CREATE TABLE `address_details` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` int(10) NOT NULL,
  `addressLine1` varchar(45) NOT NULL,
  `addressLine2` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `state` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_address_user_idx` (`userId`),
  CONSTRAINT `fk_address_user` FOREIGN KEY (`userId`) REFERENCES `user_details` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
