use sc_examination;

DROP TABLE IF EXISTS `pt_examination`;

CREATE TABLE `pt_examination` (
  `serverSideRowUuid` char(36) NOT NULL,
  `ptUuid` char(36) NOT NULL,
  `appearance_multi_select` longtext NOT NULL,
  `cognition_multi_select` longtext NOT NULL,
  `constitutional_multi_select` text NOT NULL,
  `eye_contact_multi_select` text NOT NULL,
  `impulse_control_multi_select` text NOT NULL,
  `insight_multi_select` text NOT NULL,
  `judgement_multi_select` text NOT NULL,
  `mood_affect_multi_select` text NOT NULL,
  `neurological_multi_select` text NOT NULL,
  `perceptions_multi_select` text NOT NULL,
  `psychomotor_multi_select` text NOT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
  `recordChangedFromSection` varchar(255) DEFAULT NULL,
  `appearance_select` varchar(255) DEFAULT NULL,
  `psychomotor_select` varchar(255) DEFAULT NULL,
  `attitude_multi_select` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;
