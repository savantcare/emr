use sc_medication_order;

INSERT INTO `medication_order` (`serverSideRowUuid`, `ptUuid`, `drugName`, `directionsForPatient`, `startDate`, `qty`, `daysSupply`, `numberOfRefill`, `dispenseAsWritten`, `notesToPharmacist`, `orderingProvider`, `pharmacy`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`, `recordChangedFromSection`) VALUES
('25776bc1-c377-11eb-ad4c-f59749923eff', '6b4bbfa7-7c64-4c02-99c3-2f0075d5596e', 'changeDrug', 'changePtDir', '1970-01-01 00:00:00.000', 5, 2, 5, 'ChangeDispense', 'ChangePharmacist', 'ChangeOrdering', 'ChangePharmacy', NULL, '6b4bbfa7-7c64-4c02-99c3-2f0075d5596e', 'null', 'patientFile');
