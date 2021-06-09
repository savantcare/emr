use sc_examination;

DROP TABLE IF EXISTS `pt_examination`;

CREATE TABLE `pt_examination` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `appearance_multi_select` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `cognition_multi_select` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `constitutional_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `eye_contact_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `impulse_control_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `insight_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `judgement_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `mood_affect_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `neurological_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `perceptions_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `psychomotor_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `speech_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `thought_content_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `thought_process_multi_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `attitude_multi_select` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
