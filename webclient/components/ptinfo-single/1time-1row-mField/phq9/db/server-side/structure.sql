use sc_scr;
DROP TABLE IF EXISTS `phq9PtResponses`;

CREATE TABLE `phq9PtResponses` (
 `serverSideRowUuid` char(36) NOT NULL,
 `ptUUID` char(36) NOT NULL,
 `questionUUID` char(36) NOT NULL,
 `answerValue` enum('0','1','2','3') DEFAULT NULL,
 `submittedOnDateTimeInMilliseconds` datetime(3) DEFAULT NULL,
 `recordChangedByUUID` char(36) DEFAULT NULL,
 `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
 PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING