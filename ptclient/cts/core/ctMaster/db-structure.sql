CREATE TABLE `ctMaster` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;;


INSERT INTO `ctMaster` (`uuid`, `tag`, `name`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('1', 'health', 'Recommendation', '1', '202.005.122.057'),
('3', 'health', 'Reminder', '3', '202.005.122.057'),
('4', 'health', 'BM', '3', '202.005.122.057'),
('5', 'health', 'MSE', '3', '202.005.122.057');
