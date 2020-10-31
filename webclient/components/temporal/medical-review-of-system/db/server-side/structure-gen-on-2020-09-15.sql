use sc_mental_status_exam;

DROP TABLE IF EXISTS `mental_status_exam`;

CREATE TABLE `mental_status_exam`
(
  `serverSideRowUuid` char
(36) COLLATE utf8_unicode_ci NOT NULL,
  `patientUuid` char
(36) COLLATE utf8_unicode_ci NOT NULL,
  `mentalStatusExamFieldOptionId` int
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
