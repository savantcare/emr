use sc_mse;

DROP TABLE IF EXISTS `pt_mental_status_exam`;
CREATE TABLE `pt_mental_status_exam` (
  `serverSideRowUuid` char(36) NOT NULL,
  `mentalStatusExamMasterId` int(11) NOT NULL,
  `patientUuid` char(36) NOT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  `recordChangedFromSection` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;