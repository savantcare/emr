use sc_vital_signs;

INSERT INTO `pulse` (`serverSideRowUuid`, `ptUuid`, `pulseInBpm`, `timeOfMeasurementInMilliseconds`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 90, '2020-10-14 18:30:00.000', 'test', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '::1'),
('51f56a30-1d96-11eb-b2f6-d1c45a129671', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 70, '2020-11-01 18:30:00.000', 'teste pulse', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1'),
('61bdabe0-1d0e-11eb-bf44-5d8ff2b01e2b', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 70, '2020-11-02 13:21:57.150', 'test', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1'),
('6af8f3e0-1d0e-11eb-bf44-5d8ff2b01e2b', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 70, '2020-11-02 13:22:12.638', '', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1'),
('fd3fc830-1d10-11eb-bf44-5d8ff2b01e2b', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 70, '2020-11-02 13:40:37.043', 'test 123', 'bua674fa-073b-4223-8c69-0540ee786kj8', '::1');

