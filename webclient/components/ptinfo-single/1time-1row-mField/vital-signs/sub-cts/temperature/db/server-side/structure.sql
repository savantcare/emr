use sc_vital_signs;

DROP TABLE IF EXISTS `temperature`;

CREATE TABLE `temperature` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `temperatureInFarehnite` int(11) DEFAULT NULL,
  `timeOfMeasurementInMilliseconds` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;

--
-- Dumping data for table `temperature`
--

INSERT INTO `temperature` (`serverSideRowUuid`, `ptUuid`, `temperatureInFarehnite`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 75, 'test', 'bfe041fa-073b-4223-8c69-0540ee678ff8', NULL); 