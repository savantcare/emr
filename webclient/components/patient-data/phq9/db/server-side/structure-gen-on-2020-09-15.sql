use sc_phq9;

DROP TABLE IF EXISTS `phq9`;

CREATE TABLE `phq9`
(
  `serverSideRowUuid` char
(36) COLLATE utf8_unicode_ci NOT NULL,
  `patientUuid` char
(36) COLLATE utf8_unicode_ci NOT NULL,
  `phq9FieldOptionId` int
(11) NOT NULL,
  `recordChangedByUuid` char
(36) COLLATE utf8_unicode_ci NOT NULL,
  `recordChangedFromIPAddress` varchar
(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar
(255) COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY
(`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
WITH SYSTEM VERSIONING;
