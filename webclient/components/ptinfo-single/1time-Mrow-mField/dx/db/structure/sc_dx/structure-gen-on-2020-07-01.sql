USE `sc_dx`;


DROP TABLE IF EXISTS `dx`;

CREATE TABLE `dx` (
  `uuid` char(36) NOT NULL,
  `ptUUID` char(36) NOT NULL,
  `dxName` varchar(255) DEFAULT NULL,
  `icd10Code` varchar(50) DEFAULT NULL,
  `dxDeleteNotes` varchar(255) DEFAULT NULL,
  `dxOnDate` datetime DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `dxa`;

CREATE TABLE `dxa` (
  `uuid` char(36) NOT NULL,
  `dxId` int(11) NOT NULL,
  `uid` char(36) NOT NULL,
  `assessment` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `dsmMasterCodes`;

CREATE TABLE `dsmMasterCodes` (
  `uuid` char(36) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `dsm5Code` varchar(50) DEFAULT NULL,
  `icd10Code` varchar(50) DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `icd10AndScreenMappingDetails`;

CREATE TABLE `icd10AndScreenMappingDetails` (
  `uuid` char(36) NOT NULL,
  `icd10ID` int(11) NOT NULL,
  `screenID` int(11) NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `icd10MasterCodes`;

CREATE TABLE `icd10MasterCodes` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `icd10Code` varchar(255) NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;



DROP TABLE IF EXISTS `ptReportedDx`;

CREATE TABLE `ptReportedDx` (
  `uuid` char(36) NOT NULL,
  `uid` char(36) NOT NULL,
  `dxName` varchar(255) NOT NULL,
  `whenHappened` datetime DEFAULT NULL,
  `status` enum('Patient reported','Other provider confirmed') NOT NULL DEFAULT 'Patient reported',
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `agree` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `ptReportedDxNote`;

CREATE TABLE `ptReportedDxNote` (
  `uuid` char(36) NOT NULL,
  `dxReportedId` char(36) NOT NULL,
  `note` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;



DROP TABLE IF EXISTS `ruledOutDx`;

CREATE TABLE `ruledOutDx` (
  `uuid` char(36) NOT NULL,
  `uid` char(36) NOT NULL,
  `dxId` int(11) NOT NULL,
  `dxName` varchar(255) NOT NULL,
  `icd10Code` varchar(50) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `endDate` timestamp NULL DEFAULT NULL,
  `ruledOutBy` int(10) UNSIGNED DEFAULT NULL,
  `ruledOutOn` datetime DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;



DROP TABLE IF EXISTS `ruledOutNotes`;

CREATE TABLE `ruledOutNotes` (
  `uuid` char(36) NOT NULL,
  `ruledOutId` char(36) NOT NULL,
  `note` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

