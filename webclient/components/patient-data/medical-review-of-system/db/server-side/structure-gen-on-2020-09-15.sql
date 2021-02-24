use sc_medical_review_of_system;

DROP TABLE IF EXISTS `medical_review_of_system`;

CREATE TABLE `medical_review_of_system` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ptUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `constitutional_systems_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `skin_conditions_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `allergies_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ear_nose_mouth_throat_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `eyes_head_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `respiratory_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cardiovascular_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gastrointestinal_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `urinary_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `endocrine_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `musculoskeletal_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `neurological_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `psychological_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `heme_lymphatic_select` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `any_other_signs_symptoms` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `recordChangedByUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromSection` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'patientFile',
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 WITH SYSTEM VERSIONING;
