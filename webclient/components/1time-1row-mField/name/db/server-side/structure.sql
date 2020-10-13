create database sc_users

use sc_users;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `serverSideRowUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `emailAddress` varchar(100) DEFAULT NULL,
  `dateOfBirthInMilliseconds` datetime(3) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`serverSideRowUuid`, `firstName`, `middleName`, `lastName`, `emailAddress`, `dateOfBirthInMilliseconds`, `notes`) VALUES
('01817fb0-c1ef-11ea-a3a5-f36fe4d74da4', 'jai', 'kali', 'ma', 'jai@kali.ma', NULL, NULL); 