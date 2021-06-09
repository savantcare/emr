use sc_service_statements;

DROP TABLE IF EXISTS `service_statements`;

CREATE TABLE `service_statements` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `total_minutes_in_psychotherapy` char(36) NOT NULL,
  `total_minutes_with_patient` char(36) NOT NULL,
  `modality_of_psychotherapy_multi_select` text DEFAULT NULL,
  `optional_multi_select` text DEFAULT NULL,
  `review_of_systems_multi_select` text DEFAULT NULL,
  `recordChangedByUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;