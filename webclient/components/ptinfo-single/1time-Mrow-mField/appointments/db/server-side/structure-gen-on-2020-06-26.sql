USE `sc_appointments`;
-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 26, 2020 at 02:34 PM
-- Server version: 10.4.13-MariaDB-1:10.4.13+maria~bionic
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `sc_appointments`
--


-- --------------------------------------------------------

--
-- Table structure for table `patientAppointments`
--

CREATE TABLE `patientAppointments` (
  `uuid` char(36) NOT NULL,
  `patientUuid` char(36) DEFAULT NULL,
  `providerUUID` char(36) DEFAULT NULL,
  `dateTimeOfAppt` datetime DEFAULT NULL,
  `stateOfAppt` enum('apptScheduled','apptCancelled','apptNoteNotLocked','apptNoteLocked') DEFAULT NULL,
  `recordChangedByUuid` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT '',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

