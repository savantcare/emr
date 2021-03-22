use sc_medication_order;

DROP TABLE IF EXISTS `medication_order`;

CREATE TABLE `medication_order` (
  `serverSideRowUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `drugName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `directionsForPatient` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `startDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `qty` float DEFAULT NULL,
  `daysSupply` int(11) DEFAULT NULL,
  `numberOfRefill` int(11) DEFAULT NULL,
  `dispenseAsWritten` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `notesToPharmacist` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `orderingProvider` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pharmacy` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
