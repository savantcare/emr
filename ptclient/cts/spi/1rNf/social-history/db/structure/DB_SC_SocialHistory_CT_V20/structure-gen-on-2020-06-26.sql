USE `DB_SC_SocialHistory_CT_V20`;
-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 26, 2020 at 01:43 PM
-- Server version: 10.4.13-MariaDB-1:10.4.13+maria~bionic
-- PHP Version: 7.4.5

--
-- Database: `DB_SC_SocialHistory_CT_V20`
--

-- --------------------------------------------------------

--
-- Table structure for table `birthplace`
--

CREATE TABLE `birthplace` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `currentEmploymentStatus`
--

CREATE TABLE `currentEmploymentStatus` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `currentMartialStatus`
--

CREATE TABLE `currentMartialStatus` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `educationHistories`
--

CREATE TABLE `educationHistories` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedOnDateTime` datetime DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employmentHistories`
--

CREATE TABLE `employmentHistories` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedOnDateTime` datetime DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genderTypesMaster`
--

CREATE TABLE `genderTypesMaster` (
  `id` tinyint(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `genderTypesMasterUniqueId` varchar(36) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `createdAtTimeStamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- --------------------------------------------------------

--
-- Table structure for table `highestEducation`
--

CREATE TABLE `highestEducation` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `livesIn`
--

CREATE TABLE `livesIn` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `livesWith`
--

CREATE TABLE `livesWith` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `maritalHistories`
--

CREATE TABLE `maritalHistories` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedOnDateTime` datetime DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `numberOfChildren`
--

CREATE TABLE `numberOfChildren` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedOnDateTime` datetime DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `numberOfLivingChildren`
--

CREATE TABLE `numberOfLivingChildren` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `otherMajorLifeEvents`
--

CREATE TABLE `otherMajorLifeEvents` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedByUUID` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedOnDateTime` datetime DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `socialHistoryChartStates`
--

CREATE TABLE `socialHistoryChartStates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uidOfDoctor` int(11) UNSIGNED DEFAULT NULL,
  `uidOfPatient` int(11) UNSIGNED DEFAULT NULL,
  `trackerOptions` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `socialHistoryFamily`
--

CREATE TABLE `socialHistoryFamily` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(255) NOT NULL,
  `relationship` varchar(20) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `socialHistoryFreeText`
--

CREATE TABLE `socialHistoryFreeText` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `description` mediumtext NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `socialHistoryGraphMinimize`
--

CREATE TABLE `socialHistoryGraphMinimize` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `providerId` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `socialHistoryMultiPointChild`
--

CREATE TABLE `socialHistoryMultiPointChild` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(128) DEFAULT NULL,
  `timeValueType` enum('atAge','atYear','yearsAgo','date') DEFAULT NULL,
  `timeValue` varchar(128) NOT NULL,
  `startDate` varchar(255) NOT NULL,
  `notes` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `socialHistoryMultiPointEducation`
--

CREATE TABLE `socialHistoryMultiPointEducation` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(128) DEFAULT NULL,
  `timeValueType` enum('atAge','atYear','yearsAgo','date') DEFAULT NULL,
  `timeValue` varchar(128) NOT NULL,
  `startDate` varchar(255) NOT NULL,
  `endDate` varchar(255) NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `socialHistoryMultiPointEmployment`
--

CREATE TABLE `socialHistoryMultiPointEmployment` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(128) DEFAULT NULL,
  `timeValueType` enum('atAge','atYear','yearsAgo','date') DEFAULT NULL,
  `timeValue` varchar(128) DEFAULT NULL,
  `startDate` varchar(255) NOT NULL,
  `endDate` varchar(255) NOT NULL,
  `notes` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `socialHistoryMultiPointMarital`
--

CREATE TABLE `socialHistoryMultiPointMarital` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `value` varchar(128) DEFAULT NULL,
  `timeValueType` enum('atAge','atYear','yearsAgo','date') DEFAULT NULL,
  `timeValue` varchar(128) NOT NULL,
  `startDate` varchar(255) NOT NULL,
  `endDate` varchar(255) NOT NULL,
  `notes` text NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `socialHistoryOtherMajorLifeEvents`
--

CREATE TABLE `socialHistoryOtherMajorLifeEvents` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `majorLifeEventUniqueId` varchar(36) DEFAULT NULL,
  `eventName` varchar(255) NOT NULL,
  `timeValueType` enum('atAge','atYear','yearsAgo','date') DEFAULT NULL,
  `timeValue` varchar(128) DEFAULT '',
  `notes` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `entryCreatedFrom` enum('intake_psychiatrist','intake_therapist','intake_rehab','') DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `userDateOfBirth`
--

CREATE TABLE `userDateOfBirth` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `dateOfBirthNotes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `userGender`
--

CREATE TABLE `userGender` (
  `uuid` char(36) NOT NULL,
  `uuidOfPatient` char(36) NOT NULL,
  `genderTypeID` char(36) NOT NULL,
  `notes` text DEFAULT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedOnDateTime` datetime NOT NULL DEFAULT current_timestamp(),
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


