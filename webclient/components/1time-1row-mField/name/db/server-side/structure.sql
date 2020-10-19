use sc_patient_info;

DROP TABLE IF EXISTS `name`;

CREATE TABLE `name` (
  `serverSideRowUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `patientUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `nameMasterId` int(11) NOT NULL,
  `nameFieldValue` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUuid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;

