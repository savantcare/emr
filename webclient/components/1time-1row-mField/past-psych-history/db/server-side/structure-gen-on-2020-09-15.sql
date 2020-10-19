use sc_past_psych_history;

DROP TABLE IF EXISTS `patient_data`;

CREATE TABLE `patient_data` (
  `serverSideRowUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `pastPsychHistoryFieldIdFromPastPsychHistoryMaster` int(11) NOT NULL,
  `fieldValue` text COLLATE utf8_unicode_ci NOT NULL,
  `recordChangedByUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
