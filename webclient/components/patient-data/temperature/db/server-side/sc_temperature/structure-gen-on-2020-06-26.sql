use sc_vital_signs;

DROP TABLE IF EXISTS `temperature`;

CREATE TABLE `temperature` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `temperatureInFarehnite` int(11) DEFAULT NULL,
  `timeOfMeasurementInMilliSecs` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `notes` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) NOT NULL DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
