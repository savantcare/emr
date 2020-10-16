
--
-- Database: `sc_dx`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignedDiagnosis`
--

CREATE TABLE `assignedDiagnosis` (
  `serverSideRowUuid` char(36) NOT NULL,
  `ptUuid` char(36) NOT NULL,
  `masterDiagnosisId` int(11) NOT NULL,
  `assessment` varchar(255) DEFAULT NULL,
  `startDate` datetime(3) DEFAULT NULL,
  `deletedNote` varchar(255) DEFAULT NULL,
  `recordChangedByUuid` char(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`serverSideRowUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='diagnosis table for assigned to patient from p20, created by MK' WITH SYSTEM VERSIONING;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignedDiagnosis`
--
-- ALTER TABLE `assignedDiagnosis`
--   ADD PRIMARY KEY (`serverSideRowUuid`),
--   ADD KEY `ptUid` (`ptUuid`);