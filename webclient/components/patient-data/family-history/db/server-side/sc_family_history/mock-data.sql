use sc_family_history;

INSERT INTO `family_history` (`serverSideRowUuid`, `ptUuid`, `description`,	`relationship`,`recordChangedByUuid`, `recordChangedFromIPAddress`,`recordChangedFromSection`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8','Test', 'Father', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '::1','patientFile'),
('52d68a70-1e9e-11eb-b565-875108ccf6b7', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 'test1', 'Mother', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1','patientFile'),
('57a6fe40-1e9e-11eb-b565-875108ccf6b7', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 'Test2', 'Daughter', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1','patientFile'),
('dcd7b050-1dae-11eb-ba2e-ed5eba5d4188', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 'Test3', 'Brother', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1','patientFile');
