use sc_mse;

DROP TABLE IF EXISTS `affect`;
CREATE TABLE `affect` (
  `ptUUID` char(36) NOT NULL,
  `euthymic` enum('yes','no') NOT NULL DEFAULT 'no',
  `dysphoric` enum('yes','no') NOT NULL DEFAULT 'no',
  `irritable` enum('yes','no') NOT NULL DEFAULT 'no',
  `angry` enum('yes','no') NOT NULL DEFAULT 'no',
  `bright` enum('yes','no') NOT NULL DEFAULT 'no',
  `euphoric` enum('yes','no') NOT NULL DEFAULT 'no',
  `labile` enum('yes','no') NOT NULL DEFAULT 'no',
  `stable` enum('yes','no') NOT NULL DEFAULT 'no',
  `mood-congruent` enum('yes','no') NOT NULL DEFAULT 'no',
  `mood-incongruent` enum('yes','no') NOT NULL DEFAULT 'no',
  `expansive` enum('yes','no') NOT NULL DEFAULT 'no',
  `full-range` enum('yes','no') NOT NULL DEFAULT 'no',
  `constricted` enum('yes','no') NOT NULL DEFAULT 'no',
  `blunted` enum('yes','no') NOT NULL DEFAULT 'no',
  `flat` enum('yes','no') NOT NULL DEFAULT 'no',
  `anxious` enum('yes','no') NOT NULL DEFAULT 'no',
  `tearful` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `dysthymic` enum('yes','no') NOT NULL DEFAULT 'no',
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `appearence`;
CREATE TABLE `appearence` (
  `ptUUID` char(36) NOT NULL,
  `good-grooming-and-hygiene` enum('yes','no') NOT NULL DEFAULT 'no',
  `no-apparent-distress` enum('yes','no') NOT NULL DEFAULT 'no',
  `well-developed-well-nourished` enum('yes','no') NOT NULL DEFAULT 'no',
  `appears-stated-age` enum('yes','no') NOT NULL DEFAULT 'no',
  `appears-younger-then-stated-age` enum('yes','no') NOT NULL DEFAULT 'no',
  `appears-older-then-stated-age` enum('yes','no') NOT NULL DEFAULT 'no',
  `obese` enum('yes','no') NOT NULL DEFAULT 'no',
  `thin-or-cachetic` enum('yes','no') NOT NULL DEFAULT 'no',
  `disheveled-unkempt` enum('yes','no') NOT NULL DEFAULT 'no',
  `malodorus` enum('yes','no') NOT NULL DEFAULT 'no',
  `others` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `attitude`;
CREATE TABLE `attitude` (
  `ptUUID` char(36) NOT NULL,
  `pleasant-and-cooperative` enum('yes','no') NOT NULL DEFAULT 'no',
  `uncooperative` enum('yes','no') NOT NULL DEFAULT 'no',
  `hostile-or-defiant` enum('yes','no') NOT NULL DEFAULT 'no',
  `guarded` enum('yes','no') NOT NULL DEFAULT 'no',
  `evasive` enum('yes','no') NOT NULL DEFAULT 'no',
  `apathetic` enum('yes','no') NOT NULL DEFAULT 'no',
  `disorganized-behavior` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `cognition`;
CREATE TABLE `cognition` (
  `ptUUID` char(36) NOT NULL,
  `grossly-intact-no-memory-impairment-adequate-fund-of-knowledge-n` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT 'Grossly intact, no memory impairment, adequate fund of knowledge, no language deficit, normal attention',
  `impaired` enum('yes','no') NOT NULL DEFAULT 'no',
  `fluctuating` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `constitutional`;
CREATE TABLE `constitutional` (
  `ptUUID` char(36) NOT NULL,
  `vitals-signs-stable` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `eye-contact`;
CREATE TABLE `eye-contact` (
  `ptUUID` char(36) NOT NULL,
  `appropriate` enum('yes','no') NOT NULL DEFAULT 'no',
  `downcast` enum('yes','no') NOT NULL DEFAULT 'no',
  `intense` enum('yes','no') NOT NULL DEFAULT 'no',
  `fleeting` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `impulse-control`;
CREATE TABLE `impulse-control` (
  `ptUUID` char(36) NOT NULL,
  `good` enum('yes','no') NOT NULL DEFAULT 'no',
  `fair` enum('yes','no') NOT NULL DEFAULT 'no',
  `questionable` enum('yes','no') NOT NULL DEFAULT 'no',
  `poor` enum('yes','no') NOT NULL DEFAULT 'no',
  `impaired` enum('yes','no') NOT NULL DEFAULT 'no',
  `limited` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `insight`;
CREATE TABLE `insight` (
  `ptUUID` char(36) NOT NULL,
  `good` enum('yes','no') NOT NULL DEFAULT 'no',
  `fair` enum('yes','no') NOT NULL DEFAULT 'no',
  `questionable` enum('yes','no') NOT NULL DEFAULT 'no',
  `poor` enum('yes','no') NOT NULL DEFAULT 'no',
  `impaired` enum('yes','no') NOT NULL DEFAULT 'no',
  `limited` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `judgement`;
CREATE TABLE `judgement` (
  `ptUUID` char(36) NOT NULL,
  `good` enum('yes','no') NOT NULL DEFAULT 'no',
  `fair` enum('yes','no') NOT NULL DEFAULT 'no',
  `questionable` enum('yes','no') NOT NULL DEFAULT 'no',
  `poor` enum('yes','no') NOT NULL DEFAULT 'no',
  `impaired` enum('yes','no') NOT NULL DEFAULT 'no',
  `limited` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `neurological`;
CREATE TABLE `neurological` (
  `ptUUID` char(36) NOT NULL,
  `gait-and-station-normal` enum('yes','no') NOT NULL DEFAULT 'no',
  `gait-and-station-abnormal` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `perception`;
CREATE TABLE `perception` (
  `ptUUID` char(36) NOT NULL,
  `no-avh` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT 'No AVH',
  `ah` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+AH',
  `command-ah` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+Command AH',
  `vh` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+VH',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `psychomotor`;
CREATE TABLE `psychomotor` (
  `ptUUID` char(36) NOT NULL,
  `normal` enum('yes','no') NOT NULL DEFAULT 'no',
  `agitated` enum('yes','no') NOT NULL DEFAULT 'no',
  `retarded` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `speech`;
CREATE TABLE `speech` (
  `ptUUID` char(36) NOT NULL,
  `regular-rate-and-rhythm` enum('yes','no') NOT NULL DEFAULT 'no',
  `fluent` enum('yes','no') NOT NULL DEFAULT 'no',
  `incoherent` enum('yes','no') NOT NULL DEFAULT 'no',
  `talkative` enum('yes','no') NOT NULL DEFAULT 'no',
  `pressured` enum('yes','no') NOT NULL DEFAULT 'no',
  `mumbling` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `thought-content`;
CREATE TABLE `thought-content` (
  `ptUUID` char(36) NOT NULL,
  `no-si-intent-or-plan` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT 'No SI, intent or plan',
  `no-passive-death-wish` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT 'No passive death wish',
  `no-hi-intent-or-plan` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT 'No HI, intent or plan',
  `no-delusional-thinking-observed` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT 'No delusional thinking observed',
  `no-obsessive-thinking-observed` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT 'No obsessive thinking observed',
  `ruminations` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+ruminations',
  `si-without-intent-or-plan` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+SI without intent or plan',
  `si-as-detailed-below` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+SI as detailed below',
  `hi-as-detailed-below` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+HI as detailed below',
  `delusions` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+delusions',
  `ior` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+IOR',
  `obsessions` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT '+obsessions',
  `passive-death-wish` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT 'Passive death wish',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

DROP TABLE IF EXISTS `thought-process`;
CREATE TABLE `thought-process` (
  `ptUUID` char(36) NOT NULL,
  `linear-logical-and-goal-directed` enum('yes','no') NOT NULL DEFAULT 'no',
  `disorganized` enum('yes','no') NOT NULL DEFAULT 'no',
  `circumstantial` enum('yes','no') NOT NULL DEFAULT 'no',
  `tangential` enum('yes','no') NOT NULL DEFAULT 'no',
  `looseness-of-associations` enum('yes','no') NOT NULL DEFAULT 'no',
  `flight-of-ideas` enum('yes','no') NOT NULL DEFAULT 'no',
  `poverty-of-thought` enum('yes','no') NOT NULL DEFAULT 'no',
  `other` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `timeOfEvaluation` datetime NOT NULL,
  PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;
