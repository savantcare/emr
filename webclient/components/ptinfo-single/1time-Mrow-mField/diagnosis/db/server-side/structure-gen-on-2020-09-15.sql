
--
-- Database: `sc_dx`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignedDiagnosis`
--

CREATE TABLE `assignedDiagnosis` (
  `serverSideRowUuid` char(36) NOT NULL,
  `patientUUID` char(36) NOT NULL,
  `masterDiagnosisId` int(11) NOT NULL,
  `discontinueNote` varchar(255) DEFAULT NULL,
  `recordChangedByUuid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='sample diagnosis table for assigned to patent for p20 create';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignedDiagnosis`
--
ALTER TABLE `assignedDiagnosis`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `patientId` (`patientUUID`);
COMMIT;