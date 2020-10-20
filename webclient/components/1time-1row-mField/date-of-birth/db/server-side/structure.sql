use sc_patient_info;

DROP TABLE IF EXISTS `dateOfBirth`;

CREATE TABLE `dateOfBirth` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `patientUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateOfBirthInMilliseconds` datetime(3) NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;

/*
Why we store time in DB using datetime(3)?
-- Ref: /gt/emr/docs/tech/how.md - Q.17 -> Line no:- 455
*/

--
-- Dumping data for table `dateOfBirth`
--

INSERT INTO `dateOfBirth` (`serverSideRowUuid`, `patientUuid`, `dateOfBirthInMilliseconds`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '2020-10-15 18:30:00.000', 'test', 'bfe041fa-073b-4223-8c69-0540ee678ff8', NULL);
