
--
-- Database: `sc_dx`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignedDiagnosis`
--

CREATE TABLE `assignedDiagnosis` (
  `uuid` char(36) NOT NULL,
  `patientUUID` char(36) NOT NULL,
  `masterDiagnosisId` int(11) NOT NULL,
  `discontinueNote` varchar(255) DEFAULT NULL,
  `discontinueOn` datetime(3) DEFAULT NULL,
  `insertedOn` datetime(3) NOT NULL DEFAULT current_timestamp(3)
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