use sc_bm;

INSERT INTO `bloodPressureLevels` (`ptUuid`, `systolicValue`, `diastolicValue`, `timeOfEvaluation`, `Notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 130, 80, '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `bloodSugarLevels` (`ptUuid`, `bloodSugarLevels`, `relationToMeal`, `timeOfEvaluation`, `Notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 50, 'Before breakfast', '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `BMI` (`ptUuid`, `bmiValue`, `timeOfEvaluation`, `Notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', '30.00', '2020-06-29', '', '1', '210.121.187.8');


INSERT INTO `height` (`ptUuid`, `heightInInch`, `timeOfEvaluation`, `Notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 70, '2020-06-29', 'my notes', '1', '210.121.187.8');


INSERT INTO `oxygenSaturation` (`ptUuid`, `oxygenSaturation`, `timeOfEvaluation`, `Notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 60, '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `pulse` (`ptUuid`, `beatsPerMinuteValue`, `timeOfEvaluation`, `Notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', 80, '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `temperature` (`ptUuid`, `temperatureInFarehnite`, `timeOfEvaluation`, `Notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', '37', '2020-06-29', NULL, '1', '210.121.187.8');


INSERT INTO `waistCircumference` (`ptUuid`, `waistCircumferenceInInches`, `timeOfEvaluation`, `Notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', '20.00', '2020-06-29', '', '1', '210.121.187.8');


INSERT INTO `weight` (`ptUuid`, `weightInPounds`, `timeOfEvaluation`, `Notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('bfe041fa-073b-4223-8c69-0540ee678ff8', '55.00', '2020-06-12', '', '1', '210.121.187.8');
