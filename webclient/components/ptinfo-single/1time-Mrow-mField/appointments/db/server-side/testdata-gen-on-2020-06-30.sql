-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 30, 2020 at 12:26 PM
-- Server version: 10.4.13-MariaDB-1:10.4.13+maria~bionic
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `sc_appointments`
--

--
-- Dumping data for table `patientAppointments`
--

INSERT INTO `patientAppointments` (`uuid`, `patientUuid`, `providerUuid`, `dateTimeOfAppt`, `stateOfAppt`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES
('ae339746-87c8-4214-92ad-cc219f8b21b1', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '1', '2020-08-11 17:42:41', 'apptScheduled', '2', ''),
('df7a3d43-edf0-4f8c-a1f3-a0807109ec51', 'bfe041fa-073b-4223-8c69-0540ee678ff8', '1', '2020-05-11 17:42:41', 'apptScheduled', '2', '');
