use sc_process_notes;

DROP TABLE IF EXISTS `process_notes`;

CREATE TABLE `process_notes` (
  `serverSideRowUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `notes` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUuid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
