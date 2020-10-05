use sc_user;


CREATE TABLE `users` (
  `uuid` char(36) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roleUUID` char(36) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `recordChangedByUuid` CHAR(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


INSERT INTO `users` (`uuid`, `email`, `password`, `roleUUID`, `name`, `age`, `recordChangedByUuid`, `recordChangedFromIPAddress` ) VALUES
(1, 'user1@mail.com', '123', "897d25c6-2c84-47fe-9236-2c3cc9c70bdf", 'Doctor 1', 25, '1', '8.8.8.8'),
(2, 'user2@mail.com', '123', "ae2f20c1-448b-4df0-b221-9b4c3d411f59", 'Doctor admin assistant', 25, '2', '4.4.4.4'),
("bfe041fa-073b-4223-8c69-0540ee678ff8", 'patient1@mail.com', '123', "ae0ae9e7-545a-4783-ac83-84786839dcc1", 'Patient 1', 25, '3', '202.12.20.51');

