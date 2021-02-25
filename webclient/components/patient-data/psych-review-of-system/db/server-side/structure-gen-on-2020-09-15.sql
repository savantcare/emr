use sc_psych_review_of_systems;

DROP TABLE IF EXISTS `psych_review_of_systems`;


CREATE TABLE `psych_review_of_systems` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `subjective` char(36) DEFAULT NULL,
  `depressive_mood` int(11) DEFAULT NULL,
  `depressive_interest` int(11) DEFAULT NULL,
  `depressive_sleep` int(11) DEFAULT NULL,
  `depressive_esteem` int(11) DEFAULT NULL,
  `depressive_energy` int(11) DEFAULT NULL,
  `depressive_conc` int(11) DEFAULT NULL,
  `depressive_appetite` int(11) DEFAULT NULL,
  `depressive_retardation` int(11) DEFAULT NULL,
  `depressive_suicidal` int(11) DEFAULT NULL,
  `gateway_depressed` int(11) DEFAULT NULL,
  `gateway_energetic` int(11) DEFAULT NULL,
  `gateway_interest` int(11) DEFAULT NULL,
  `gateway_mood` int(11) DEFAULT NULL,
  `gateway_irritable` int(11) DEFAULT NULL,
  `gateway_difficult` int(11) DEFAULT NULL,
  `mania_mood` int(11) DEFAULT NULL,
  `mania_irritable` int(11) DEFAULT NULL,
  `mania_energy` int(11) DEFAULT NULL,
  `mania_sleep` int(11) DEFAULT NULL,
  `mania_talking` int(11) DEFAULT NULL,
  `mania_racing` int(11) DEFAULT NULL,
  `mania_distractability` int(11) DEFAULT NULL,
  `mania_risk` int(11) DEFAULT NULL,
  `obese` int(11) DEFAULT NULL,
  `thinCachectic` int(11) NOT NULL,
  `disheveledUnkempt` int(11) NOT NULL,
  `malodorous` int(11) NOT NULL,
  `recordChangedByUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'patientFile',
   PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;