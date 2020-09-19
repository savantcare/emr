use sc_rec;


DROP TABLE IF EXISTS `doctorRecsForPts`;

CREATE TABLE `doctorRecsForPts` (
  `uuid` CHAR(36) NOT NULL,
  `uuidOfRecMadeFor` CHAR(36) NOT NULL,
  `recDescription` longtext,
  `notes` text DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `isAutoRec` int(11) DEFAULT NULL,
  `autoRecsOrderId` int(11) DEFAULT NULL,
  `recordChangedByUUID` CHAR(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;
