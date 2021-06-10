use sc_allergies;

INSERT INTO `allergies_present`(`serverSideRowUuid`, `ptUuid`, `present`, `recordChangedByUuid`, `recordChangedFromIPAddress`, `recordChangedFromSection`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 'Yes', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '::1', 'patientFile'),
('52d68a70-1e9e-11eb-b565-875108ccf6b7', '6b4bbfa7-7c64-4c02-99c3-2f0075d5596e', 'No known drug allergies', '6b4bbfa7-7c64-4c02-99c3-2f0075d5596e', '::1', 'patientFile'),
('57a6fe40-1e9e-11eb-b565-875108ccf6b7', 'bua674fa-073b-4223-8c69-0540ee786kj8', 'Not evaluated', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1', 'patientFile');


INSERT INTO `allergies`(`serverSideRowUuid`, `ptUuid`, `allergen`, `reaction`, `onset`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`, `recordChangedFromSection`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 'addAllergen1', 'addReaction1','2021-06-09','', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '::1', 'patientFile'),
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da5', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 'addAllergen2', 'addReaction2','2021-06-09','', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '::1', 'patientFile');
