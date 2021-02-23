use sc_social_history;

DROP TABLE IF EXISTS `social_history`;

CREATE TABLE `social_history` (
  `serverSideRowUuid` char(36) NOT NULL,
  `ptUuid` char(36) NOT NULL,
  `current_social_situation` text NOT NULL,
  `education_work_history` text NOT NULL,
  `social_supports` text NOT NULL,
  `developmental_history` text NOT NULL,
  `trauma_history` text NOT NULL,
  `recordChangedByUuid` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  `recordChangedFromSection` varchar(255) NOT NULL DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
