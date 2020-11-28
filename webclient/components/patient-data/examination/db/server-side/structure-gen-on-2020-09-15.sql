use sc_examination;

DROP TABLE IF EXISTS `pt_examination`;

CREATE TABLE `pt_examination` (
  `serverSideRowUuid` char(36) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `patientUuid` char(36) NOT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  `recordChangedFromSection` varchar(255) DEFAULT NULL,
  `appearance_select` varchar(255) DEFAULT NULL,
  `psychomotor_select` varchar(255) DEFAULT NULL,
  `attitude_multi_select` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;
