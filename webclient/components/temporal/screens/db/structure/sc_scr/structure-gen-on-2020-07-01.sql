USE `sc_scr`;


DROP TABLE IF EXISTS `phq9PtResponses`;
CREATE TABLE `phq9PtResponses` (
  `ptUuid` char(36) NOT NULL,
  `question1` enum('0','1','2','3') DEFAULT NULL,
  `question2` enum('0','1','2','3') DEFAULT NULL,
  `question3` enum('0','1','2','3') DEFAULT NULL,
  `question4` enum('0','1','2','3') DEFAULT NULL,
  `question5` enum('0','1','2','3') DEFAULT NULL,
  `question6` enum('0','1','2','3') DEFAULT NULL,
  `question7` enum('0','1','2','3') DEFAULT NULL,
  `question8` enum('0','1','2','3') DEFAULT NULL,
  `question9` enum('0','1','2','3') DEFAULT NULL,
  `question10` enum('0','1','2','3') DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `scrAssignedToPts`;
CREATE TABLE `scrAssignedToPts` (
  `uuid` char(36) NOT NULL,
  `scrUuid` char(36) DEFAULT NULL,
  `ptUuid` char(36) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `scrListMasters`;
CREATE TABLE `scrListMasters` (
  `uuid` char(36) NOT NULL,
  `scrName` varchar(255) DEFAULT NULL,
  `scientificName` varchar(255) DEFAULT NULL,
  `clinicalStudies` text DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

