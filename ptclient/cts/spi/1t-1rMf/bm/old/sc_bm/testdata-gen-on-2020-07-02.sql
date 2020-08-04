use sc_bm;

INSERT INTO `bloodPressure` (`ptUUID`, `systolicValue`, `diastolicValue`, `timeOfEvaluation`, `Notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 130, 80, '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `bloodSugar` (`ptUUID`, `bloodSugar`, `relationToMeal`, `timeOfEvaluation`, `Notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 50, 'Before breakfast', '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `BMI` (`ptUUID`, `bmiValue`, `timeOfEvaluation`, `Notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', '30.00', '2020-06-29', '', '1', '210.121.187.8');


INSERT INTO `height` (`ptUUID`, `heightInInch`, `timeOfEvaluation`, `Notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 70, '2020-06-29', 'my notes', '1', '210.121.187.8');


INSERT INTO `oxygenSaturation` (`ptUUID`, `oxygenSaturation`, `timeOfEvaluation`, `Notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 60, '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `pulse` (`ptUUID`, `beatsPerMinuteValue`, `timeOfEvaluation`, `Notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 80, '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `temperature` (`ptUUID`, `temperatureInFarehnite`, `timeOfEvaluation`, `Notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', '37', '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `waistCircumference` (`ptUUID`, `waistCircumferenceInInches`, `timeOfEvaluation`, `Notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', '20.00', '2020-06-29', '', '1', '210.121.187.8');


INSERT INTO `weight` (`ptUUID`, `weightInPounds`, `timeOfEvaluation`, `Notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', '55.00', '2020-06-12', '', '1', '210.121.187.8');
