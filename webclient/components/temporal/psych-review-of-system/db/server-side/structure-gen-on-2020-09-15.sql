use sc_psych_review_of_system;

DROP TABLE IF EXISTS `psych_review_of_system`;

CREATE TABLE `psych_review_of_system`
(
  `serverSideRowUuid` char
(36) COLLATE utf8_unicode_ci NOT NULL,
  `patientUuid` char
(36) COLLATE utf8_unicode_ci NOT NULL,
  `psychReviewOfSystemFieldOptionId` int
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
