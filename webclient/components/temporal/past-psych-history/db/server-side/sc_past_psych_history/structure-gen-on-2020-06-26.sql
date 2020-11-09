use sc_past_psych_history;

DROP TABLE IF EXISTS `past_psych_history`;

CREATE TABLE `past_psych_history` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `past_outpatient_treatment` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `past_meds_trials` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `hospitalization` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `history_of_violence` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `history_of_self_harm` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `past_substance_abuse` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `recordChangedByUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
   PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;

