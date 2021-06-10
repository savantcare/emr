use sc_diagnosis;

INSERT INTO `diagnosis`(`serverSideRowUuid`, `ptUuid`, `diagnosis`, `assessment`, `onset`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`, `recordChangedFromSection`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8','Flu', 'Test','2021-06-08 15:13:00.000', 'test', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '::1', 'patientFile'),
('52d68a70-1e9e-11eb-b565-875108ccf6b7', 'bfe041fa-073b-4223-8c69-0540ee678ff8','Flu','Test','2021-06-08 15:13:00.000', 'aa', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1', 'patientFile'),
('57a6fe40-1e9e-11eb-b565-875108ccf6b7', 'bfe041fa-073b-4223-8c69-0540ee678ff8','Flu', 'Test','2021-06-08 15:13:00.000','', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1', 'patientFile'),
('dcd7b050-1dae-11eb-ba2e-ed5eba5d4188', 'bfe041fa-073b-4223-8c69-0540ee678ff8','Flu', 'Test','2021-06-08 15:13:00.000','test', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1', 'patientFile');
