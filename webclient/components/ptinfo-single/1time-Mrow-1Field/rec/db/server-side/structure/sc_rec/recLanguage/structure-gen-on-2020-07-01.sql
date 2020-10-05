use sc_rec;

DROP TABLE IF EXISTS `recLanguage`;

CREATE TABLE `recLanguage` (
  `uuid` CHAR(36) NOT NULL,
  `template` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `recordChangedByUuid` CHAR(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;
