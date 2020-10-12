use sc_service_statements;

DROP TABLE IF EXISTS `service_statements`;

CREATE TABLE `service_statements` (
  `serverSideRowUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `patientUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `serviceStatementFieldIdFromServiceStatementMaster` int(11) NOT NULL,
  `recordChangedByUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
