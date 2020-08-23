-- DB name has _ so that phpmyadmin creates tree struture
use sc_phone_number;

DROP TABLE IF EXISTS `numbers`;


-- Tables names should be signular: Reason: https://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names

CREATE TABLE `numbers` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `ptUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `countryCode` char(6) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phoneNumber` char(15) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `recordChangedByUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
