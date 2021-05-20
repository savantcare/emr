use sc_diagnosis;

DROP TABLE IF EXISTS `diagnosis`;

CREATE TABLE `diagnosis` (
  `serverSideRowUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `diagnosis` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `assessment` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `onset` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `notes` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUuid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
