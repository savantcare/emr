use sc_bm;

DROP TABLE IF EXISTS `bloodPressureLevels`;
CREATE TABLE `bloodPressureLevels` (
  `ptUuid` char(36) NOT NULL,
  `systolicValue` int(11) NOT NULL COMMENT 'mm Hg',
  `diastolicValue` int(11) NOT NULL COMMENT 'mm Hg',
  `timeOfEvaluation` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `bloodSugarLevels`;
CREATE TABLE `bloodSugarLevels` (
  `ptUuid` char(36) NOT NULL,
  `bloodSugarLevels` int(11) NOT NULL,
  `relationToMeal` enum('Before breakfast','After breakfast','Before lunch','After lunch','Before dinner','After dinner','Bed time','Other') NOT NULL,
  `timeOfEvaluation` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
   PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `BMI`;
CREATE TABLE `BMI` (
  `ptUuid` char(36) NOT NULL,
  `bmiValue` decimal(10,2) NOT NULL,
  `timeOfEvaluation` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `height`;

CREATE TABLE `height` (
  `ptUuid` char(36) NOT NULL,
  `heightInInch` int(4) NOT NULL,
  `timeOfEvaluation` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `oxygenSaturation`;

CREATE TABLE `oxygenSaturation` (
  `ptUuid` char(36) NULL,
  `oxygenSaturation` int(11) NOT NULL,
  `timeOfEvaluation` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `pulse`;
CREATE TABLE `pulse` (
  `ptUuid` char(36) NOT NULL,
  `beatsPerMinuteValue` int(4) NOT NULL,
  `timeOfEvaluation` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `temperature`;
CREATE TABLE `temperature` (
  `ptUuid` char(36) DEFAULT NULL,
  `temperatureInFarehnite` decimal(10,0) NOT NULL,
  `timeOfEvaluation` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
   PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `waistCircumference`;
CREATE TABLE `waistCircumference` (
  `ptUuid` char(36) NOT NULL,
  `waistCircumferenceInInches` decimal(10,2) NOT NULL,
  `timeOfEvaluation` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


DROP TABLE IF EXISTS `weight`;
CREATE TABLE `weight` (
  `ptUuid` char(36) NOT NULL,
  `weightInPounds` decimal(10,2) NOT NULL,
  `timeOfEvaluation` date DEFAULT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ptUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

