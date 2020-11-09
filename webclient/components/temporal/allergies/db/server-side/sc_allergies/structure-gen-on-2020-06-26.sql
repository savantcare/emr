use sc_allergies;

DROP TABLE IF EXISTS `allergies`;

CREATE TABLE `allergies` (
  `serverSideRowUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `allergen` text COLLATE utf8_unicode_ci NOT NULL,
  `reaction` text COLLATE utf8_unicode_ci NOT NULL,
  `onset` text COLLATE utf8_unicode_ci NOT NULL,
  `notes` text COLLATE utf8_unicode_ci NULL,
  `recordChangedByUuid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
