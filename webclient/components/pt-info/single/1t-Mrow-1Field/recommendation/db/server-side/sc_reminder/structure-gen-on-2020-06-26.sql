use sc_rec;

DROP TABLE IF EXISTS `recs`;

CREATE TABLE `recs` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `ptUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `isAutoRec` int(11) DEFAULT NULL,
  `recordChangedByUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
