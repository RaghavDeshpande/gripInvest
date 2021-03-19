DROP TRIGGER IF EXISTS `grip_invest`.`user_details_BEFORE_INSERT`;

DELIMITER $$
USE `grip_invest`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `grip_invest`.`user_details_BEFORE_INSERT` BEFORE INSERT ON `user_details` FOR EACH ROW
BEGIN
	SET NEW.createdAt = NOW();
    SET NEW.updatedAt = NOW();
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS `grip_invest`.`user_details_BEFORE_UPDATE`;

DELIMITER $$
USE `grip_invest`$$
CREATE DEFINER = CURRENT_USER TRIGGER `grip_invest`.`user_details_BEFORE_UPDATE` BEFORE UPDATE ON `user_details` FOR EACH ROW
BEGIN
	SET NEW.updatedAt = NOW();
END$$
DELIMITER ;


DROP TRIGGER IF EXISTS `grip_invest`.`wallet_BEFORE_INSERT_WRONG_SCHEMA`;

DELIMITER $$
USE `grip_invest`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `grip_invest`.`wallet_BEFORE_INSERT` BEFORE INSERT ON `wallet` FOR EACH ROW
BEGIN
	SET NEW.createdAt = NOW();
    SET NEW.updatedAt = NOW();
    SET NEW.createdBy = USER();
    SET NEW.updatedBy = USER();
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS `grip_invest`.`wallet_BEFORE_UPDATE`;

DELIMITER $$
USE `grip_invest`$$
CREATE DEFINER = CURRENT_USER TRIGGER `grip_invest`.`wallet_BEFORE_UPDATE` BEFORE UPDATE ON `wallet` FOR EACH ROW
BEGIN
 SET NEW.updatedAt = NOW();
 SET NEW.updatedBy = USER();
END$$
DELIMITER ;


DROP TRIGGER IF EXISTS `grip_invest`.`address_details_BEFORE_INSERT`;

DELIMITER $$
USE `grip_invest`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `grip_invest`.`address_details_BEFORE_INSERT` BEFORE INSERT ON `address_details` FOR EACH ROW
BEGIN
	SET NEW.createdAt = NOW();
    SET NEW.updatedAt = NOW();
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS `grip_invest`.`address_details_BEFORE_UPDATE`;

DELIMITER $$
USE `grip_invest`$$
CREATE DEFINER = CURRENT_USER TRIGGER `grip_invest`.`address_details_BEFORE_UPDATE` BEFORE UPDATE ON `address_details` FOR EACH ROW
BEGIN
    SET NEW.updatedAt = NOW();
END$$
DELIMITER ;
