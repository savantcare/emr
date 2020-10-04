use sc_body_measurement;

DROP TABLE IF EXISTS `bloodSugar`;

CREATE TABLE `bloodSugar` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ptUUID` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `bloodSugarInBpm` int(11) DEFAULT NULL,
  `timeOfMeasurementInMilliseconds` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;

--
-- Dumping data for table `bloodSugar`
--

INSERT INTO `bloodSugar` (`serverSideRowUuid`, `ptUUID`, `bloodSugarInBpm`, `notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 75, 'test', 'bfe041fa-073b-4223-8c69-0540ee678ff8', NULL); 