use sc_plan_comments;

DROP TABLE IF EXISTS `plan_comments`;

CREATE TABLE `plan_comments` (
  `serverSideRowUuid` char(36) NOT NULL,
  `ptUuid` char(36) NOT NULL,
  `description` text NOT NULL,
  `recordChangedByUuid` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `recordChangedFromSection` varchar(255) NOT NULL DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;