use sc_psych_review_of_systems;

DROP TABLE IF EXISTS `psych_review_of_systems`;

CREATE TABLE `psych_review_of_systems` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `subjective` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `depressive_mood` float DEFAULT NULL,
  `depressive_interest` float DEFAULT NULL,
  `depressive_sleep` float DEFAULT NULL,
  `depressive_esteem` float DEFAULT NULL,
  `depressive_energy` float DEFAULT NULL,
  `depressive_conc` float DEFAULT NULL,
  `depressive_appetite` float DEFAULT NULL,
  `depressive_retardation` float DEFAULT NULL,
  `depressive_suicidal` float DEFAULT NULL,
  `gateway_depressed` float DEFAULT NULL,
  `gateway_energetic` float DEFAULT NULL,
  `gateway_interest` float DEFAULT NULL,
  `gateway_mood` float DEFAULT NULL,
  `gateway_irritable` float DEFAULT NULL,
  `gateway_difficult` float DEFAULT NULL,
  `mania_mood` float DEFAULT NULL,
  `mania_irritable` float DEFAULT NULL,
  `mania_energy` float DEFAULT NULL,
  `mania_sleep` float DEFAULT NULL,
  `mania_talking` float DEFAULT NULL,
  `mania_racing` float DEFAULT NULL,
  `mania_distractibility` float DEFAULT NULL,
  `mania_risk` float DEFAULT NULL,
  `psychosis_delusions` float DEFAULT NULL,
  `psychosis_hallucinations` float DEFAULT NULL,
  `psychosis_speech` float DEFAULT NULL,
  `psychosis_behavior` float DEFAULT NULL,
  `psychosis_negativeSx` float DEFAULT NULL,
  `gad_anxiety` float DEFAULT NULL,
  `gad_difficult` float DEFAULT NULL,
  `gad_restless` float DEFAULT NULL,
  `gad_fatigued` float DEFAULT NULL,
  `gad_concentrating` float DEFAULT NULL,
  `gad_irritability` float DEFAULT NULL,
  `gad_muscle` float DEFAULT NULL,
  `gad_disturbance` float DEFAULT NULL,
  `adhd_inattention` float DEFAULT NULL,
  `adhd_hyperactivity` float DEFAULT NULL,
  `adhd_careless` float DEFAULT NULL,
  `adhd_problem` float DEFAULT NULL,
  `adhd_poor` float DEFAULT NULL,
  `adhd_fails` float DEFAULT NULL,
  `adhd_difficulty` float DEFAULT NULL,
  `adhd_reluctant` float DEFAULT NULL,
  `adhd_loses` float DEFAULT NULL,
  `adhd_distracted` float DEFAULT NULL,
  `adhd_forgetful` float DEFAULT NULL,
  `adhd_fidgets` float DEFAULT NULL,
  `adhd_leaves` float DEFAULT NULL,
  `adhd_feels` float DEFAULT NULL,
  `adhd_unable` float DEFAULT NULL,
  `adhd_seems` float DEFAULT NULL,
  `adhd_talks` float DEFAULT NULL,
  `adhd_blurts` float DEFAULT NULL,
  `adhd_difficulty_waiting` float DEFAULT NULL,
  `adhd_interrupts` float DEFAULT NULL,
  `recordChangedByUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'patientFile',
   PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
