use sc_body_measurement;

DROP TABLE IF EXISTS `height`;

CREATE TABLE `height` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `ptUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `heightInInches` int(11) DEFAULT NULL,
  `timeOfMeasurement` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;


INSERT INTO `height` (`uuid`, `ptUUID`, `heightInInches`, `timeOfMeasurement`, `notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 50, '2020-09-16 17:58:02', 'test', 'bfe041fa-073b-4223-8c69-0540ee678ff8', NULL);