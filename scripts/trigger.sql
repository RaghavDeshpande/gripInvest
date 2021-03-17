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


