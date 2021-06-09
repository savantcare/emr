use sc_vital_signs;

INSERT INTO `waist_circumference`(`serverSideRowUuid`, `ptUuid`, `waistCircumferenceInInches`, `timeOfMeasurementInMilliSecs`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`, `recordChangedFromSection`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 95, '2020-10-15 18:30:00.000', 'test', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '::1', 'patientFile'),
('52d68a70-1e9e-11eb-b565-875108ccf6b7', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 11, '2020-11-04 13:04:51.000', 'aa', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1', 'patientFile'),
('57a6fe40-1e9e-11eb-b565-875108ccf6b7', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 11, '2020-11-04 13:04:59.000', '', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1', 'patientFile'),
('dcd7b050-1dae-11eb-ba2e-ed5eba5d4188', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 58, '2020-11-01 18:30:00.000', 'test', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1', 'patientFile');
