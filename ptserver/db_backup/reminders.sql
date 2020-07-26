-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2020 at 11:04 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sc_reminder`
--

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders`
(
  `id` int
(11) NOT NULL,
  `reminderID` varchar
(255) DEFAULT NULL,
  `description` varchar
(255) DEFAULT NULL,
  `discontinue` tinyint
(1) DEFAULT NULL,
  `patientId` decimal
(10,0) DEFAULT NULL,
  `createdByUserId` decimal
(10,0) DEFAULT NULL,
  `discontinuedByUserId` decimal
(10,0) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `discontinueAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`id`,`reminderID`, `description`, `discontinue`, `patientId`, `createdByUserId`, `discontinuedByUserId`, `createdAt`, `updatedAt`, `discontinueAt`) VALUES
(1, '1ka9f6zis', 'e1', NULL, '1', '1', NULL, '2020-05-15 16:00:00', '2020-05-16 09:20:23', NULL),
(2, '1ka9f8e1a', 'R2', NULL, '1', '1', NULL, '2020-05-15 16:00:00', '2020-05-16 09:21:28', NULL),
(3, '1ka9f9zhu', 'r3', 1, '1', '2', '1', '2020-05-15 16:00:00', '2020-05-16 09:24:10', '2020-05-16 09:24:10'),
(4, NULL, 'r3 (update)', NULL, '1', '1', NULL, '2020-05-16 09:24:10', '2020-05-16 09:24:10', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
ADD PRIMARY KEY
(`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
