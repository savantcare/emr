use sc_scr;

DROP TABLE IF EXISTS `phq9PtResponses`;
-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 16, 2020 at 08:42 AM
-- Server version: 10.4.13-MariaDB-1:10.4.13+maria~bionic
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sc_scr`
--

-- --------------------------------------------------------

--
-- Table structure for table `phq9PtResponses`
--
CREATE TABLE `phq9PtResponses` (
 `ptUUID` char(36) NOT NULL,
 `question1` enum('0','1','2','3') DEFAULT NULL,
 `question2` enum('0','1','2','3') DEFAULT NULL,
 `question3` enum('0','1','2','3') DEFAULT NULL,
 `question4` enum('0','1','2','3') DEFAULT NULL,
 `question5` enum('0','1','2','3') DEFAULT NULL,
 `question6` enum('0','1','2','3') DEFAULT NULL,
 `question7` enum('0','1','2','3') DEFAULT NULL,
 `question8` enum('0','1','2','3') DEFAULT NULL,
 `question9` enum('0','1','2','3') DEFAULT NULL,
 `question10` enum('0','1','2','3') DEFAULT NULL,
 `recordChangedByUUID` char(36) DEFAULT NULL,
 `recordChangedFromIPAddress` varchar(20) DEFAULT NULL,
 PRIMARY KEY (`ptUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING

-- --------------------------------------------------------

--
-- Table structure for table `scrAssignedToPts`
--

CREATE TABLE `scrAssignedToPts` (
  `uuid` varchar(36) NOT NULL,
  `scrUUID` varchar(36) DEFAULT NULL,
  `ptUUID` varchar(36) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(255) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `scrListMasters`
--

CREATE TABLE `scrListMasters` (
  `uuid` varchar(255) NOT NULL,
  `scrName` varchar(255) DEFAULT NULL,
  `scientificName` varchar(255) DEFAULT NULL,
  `clinicalStudies` text DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

