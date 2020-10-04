use sc_prs
-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 16, 2020 at 03:25 PM
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
-- Database: `sc_prs`
--

-- --------------------------------------------------------

--
-- Table structure for table `adhd`
--

CREATE TABLE `adhd` (
  `patientUUID` varchar(64) NOT NULL,
  `inattention` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: INATTENTION',
  `hyperactivity` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: HYPERACTIVITY',
  `careless-mistakes-or-poor-attention-to-detail` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Careless mistakes or poor attention to detail',
  `problem-sustaining-attention` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Problem sustaining attention',
  `poor-listening` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Poor listening',
  `fails-to-finish-tasks` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Fails to finish tasks',
  `difficulty-organizing-tasks` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Difficulty organizing tasks',
  `reluctant-to-engage-in-tasks-require-sustained-mental-effort` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Reluctant to engage in tasks that require sustained mental effort',
  `loses-things-often` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Loses things often',
  `distracted-by-extraneous-stimuli` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Distracted by extraneous stimuli',
  `forgetful-daily-activities` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Forgetful daily activities',
  `fidgets-often` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Fidgets often',
  `leaves-seat-often-when-sitting-is-expected` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Leaves seat often when sitting is expected',
  `feels-restless` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Feels restless',
  `unable-to-engage-in-leisurely-activities-quietly` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Unable to engage in leisurely activities quietly',
  `seems-on-the-go-or-driven-by-motor` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Seems "on the go" or "driven by motor"',
  `talks-excessively` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Talks excessively',
  `blurts-out-often` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Blurts out often',
  `difficulty-waiting-turn` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Difficulty waiting turn',
  `interrupts-or-intrudes-on-others` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Interrupts or intrudes on others',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `anorexia`
--

CREATE TABLE `anorexia` (  
  `patientUUID` varchar(64) NOT NULL,
  `food-restriction-leading-to-significantly-low-weight` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Food restriction leading to significantly low weight',
  `intense-fear-of-gaining-weight` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Intense fear of gaining weight or behavior that interferes with wt gain',
  `body-image-disturbance-or-excess-influence-of-shape` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Body image disturbance, or excess influence of shape on self evaluation, or denial of seriousness of low body weight',
  `latest-bmi` text NOT NULL COMMENT 'Q: Latest BMI',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `bulimia`
--

CREATE TABLE `bulimia` (
  `patientUUID` varchar(64) NOT NULL,
  `binge-eating-large-quantity-and-lack-of-control-of-eating` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Binge eating (large quantity and lack of control of eating)',
  `compensatory-behaviors-vomiting-laxatives-fasting-exercise` enum('0','.5','1','2','3','4') NOT NULL COMMENT 'Selectbox type, 0, .5, 1 to 4. Q: Compensatory behaviors (vomiting, laxatives, fasting, exercise)',
  `self-evaluation-highly-influenced-by-shape` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Self evaluation highly influenced by shape',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `dementia`
--

CREATE TABLE `dementia` (
  `patientUUID` varchar(64) NOT NULL,
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `depression`
--

CREATE TABLE `depression` (
  `patientUUID` varchar(64) NOT NULL,
  `depressive-mood` enum('not present','sub syndromal','syndromal') NOT NULL,
  `interest` enum('not present','sub syndromal','syndromal') NOT NULL,
  `sleep` enum('not present','sub syndromal','syndromal') NOT NULL,
  `guilt-or-self-esteem` enum('not present','sub syndromal','syndromal') NOT NULL,
  `energy` enum('not present','sub syndromal','syndromal') NOT NULL,
  `conc-or-distr` enum('not present','sub syndromal','syndromal') NOT NULL,
  `appetite` enum('not present','sub syndromal','syndromal') NOT NULL,
  `pmr-or-pma` enum('not present','sub syndromal','syndromal') NOT NULL,
  `sl` enum('not present','sub syndromal','syndromal') NOT NULL,
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `gad`
--

CREATE TABLE `gad` (
  `patientUUID` varchar(64) NOT NULL,
  `excess-worry-or-anxiety` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'This is selectbox type. Q: Excess worry or anxiety',
  `difficult-to-control-worry` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Difficult to control worry',
  `restless-or-on-edge` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type. Q: Restless or on edge',
  `fatigued` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Q: Fatigued',
  `difficulty-concentrating` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Q: Difficulty Concentrating',
  `irritability` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Q: Irritability',
  `muscle-tension` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Q: Muscle Tension',
  `sleep-disturbance` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Q: Sleep Disturbance',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `gateway-mood-symptoms`
--

CREATE TABLE `gateway-mood-symptoms` (
  `patientUUID` varchar(64) NOT NULL,
  `num-days-felt-depressed-in-past-ten-days` tinyint(1) NOT NULL COMMENT 'Selectbox, 0 to 10. Q: In the past 10 days, how many days have you felt depressed for most of the day?',
  `num-days-felt-low-interest-or-motivation-in-past-ten-days` tinyint(1) NOT NULL COMMENT 'Selectbox, 0 to 10. Q: In the past 10 days, how many days have you felt low interest or motivation throughout most of the day?',
  `num-days-abnormally-irritable-in-past-ten-days` tinyint(1) NOT NULL COMMENT 'Selectbox, 0 to 10. Q: In the past 10 days, how many days have you been abnormally irritable throughout most of the day?',
  `num-days-abnormally-energetic-or-high-energy-in-past-ten-days` tinyint(1) NOT NULL COMMENT 'Selectbox, 0 to 10. Q: In the past 10 days, how many days have you been abnormally energetic or high energy throughout most of the day?',
  `num-days-felt-abnormal-mood-elevation-in-past-ten-days` tinyint(1) NOT NULL COMMENT 'Selectbox, 0 to 10. Q: In the past 10 days, how many days have you felt abnormal mood elevation throughout most of the day?',
  `how-difficult-to-the-above-symptoms-make-your-day-to-day-life` enum('Not at all','Somewhat difficult','Very difficult','Extremely difficult','Incapacitating') NOT NULL COMMENT 'Selectbox. Q: How difficult to the above symptoms make your day to day life?',
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `homicide-assessment`
--

CREATE TABLE `homicide-assessment` (
  `patientUUID` varchar(64) NOT NULL,
  `does-patient-report-homicidal-ideations` enum('yes','no') NOT NULL COMMENT 'Selectbox type Q: Does patient report homicidal ideations ?',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `mania-hypomania`
--

CREATE TABLE `mania-hypomania` (
  `patientUUID` varchar(64) NOT NULL,
  `mood-elevation` enum('not present','sub syndromal','syndromal') NOT NULL,
  `irritable` enum('not present','sub syndromal','syndromal') NOT NULL,
  `energy-or-gda-or-pma` enum('not present','sub syndromal','syndromal') NOT NULL,
  `sleep-need` enum('not present','sub syndromal','syndromal') NOT NULL,
  `talking` enum('not present','sub syndromal','syndromal') NOT NULL,
  `racing-thoughts-or-foi` enum('not present','sub syndromal','syndromal') NOT NULL,
  `distractibility` enum('not present','sub syndromal','syndromal') NOT NULL,
  `high-risk-behaviour` enum('not present','sub syndromal','syndromal') NOT NULL,
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `ocd`
--

CREATE TABLE `ocd` (
  `patientUUID` varchar(64) NOT NULL,
  `obsessions` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'This is selectbox type. Q: Obsessions',
  `compulsions` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Compulsions',
  `distressing-or-impairing-or-time-consuming-more-than-1hr-per-day` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type. Q: Distressing or Impairing or Time-Consuming ( > 1 hr/day)',
  `insight` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Q: Insight',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


-- --------------------------------------------------------

--
-- Table structure for table `panic-attacks`
--

CREATE TABLE `panic-attacks` (
  `patientUUID` varchar(64) NOT NULL,
  `panic-attacks-per-month` text NOT NULL COMMENT 'This is textarea type. Q: Panic Attacks Per Month',
  `impairment-caused-by-panic-attacks` tinyint(1) NOT NULL COMMENT 'Selectbox type, 0 to 4. Q: Impairment Caused by Panic Attacks',
  `intensity-of-panic-attacks` tinyint(1) NOT NULL COMMENT 'Selectbox type, 0 to 4. Q: Intensity of Panic Attacks',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `psychosis`
--

CREATE TABLE `psychosis` (
  `patientUUID` varchar(64) NOT NULL,
  `delusions` enum('not present','sub syndromal','syndromal') NOT NULL,
  `hallucinations` enum('not present','sub syndromal','syndromal') NOT NULL,
  `disorganized-speech` enum('not present','sub syndromal','syndromal') NOT NULL,
  `disorganized-or-catatonic-behavior` enum('not present','sub syndromal','syndromal') NOT NULL,
  `negative-sxs` enum('not present','sub syndromal','syndromal') NOT NULL,
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `ptsd`
--

CREATE TABLE `ptsd` (
  `patientUUID` varchar(64) NOT NULL,
  `re-experiencing-symptoms` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Re-experiencing Symptoms',
  `avoidance-symptoms` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Avoidance Symptoms',
  `arousal-symptoms` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Arousal Symptoms',
  `negative-mood-or-cognitions` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Negative Mood or Cognitions',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `sleep`
--

CREATE TABLE `sleep` (
  `patientUUID` varchar(64) NOT NULL,
  `average-number-of-hours-slept-per-night-doctors-assessment` text NOT NULL,
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `social-anxiety`
--

CREATE TABLE `social-anxiety` (
  `patientUUID` varchar(64) NOT NULL,
  `marked-anxiety-about-1-or-more-social-situations` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'This is selectbox type. Q: Marked anxiety about 1 or more social situations',
  `fear-that-will-act-in-a-way-that-will-be-negatively-evaluated` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type Q: Fear that will act in a way that will be negatively evaluated',
  `social-situations-almost-always-provokes-anxiety` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Selectbox type. Q: Social situation(s) almost always provokes anxiety',
  `social-situations-is-avoided-or-endured-with-intense-anxiety` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Q: Social situation(s) is avoided or endured with intense anxiety',
  `anxiety-is-out-of-proportion-to-actual-threat-of-the-situation` enum('not present','sub syndromal','syndromal') NOT NULL COMMENT 'Q: Anxiety is out of proportion to actual threat of the situation',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `subjective`
--

CREATE TABLE `subjective` (
  `patientUUID` varchar(64) NOT NULL,
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `substance-use`
--

CREATE TABLE `substance-use` (
  `patientUUID` varchar(64) NOT NULL,
  `used-in-larger-amounts-or-over-longer-period-than-intended` enum('yes','no') NOT NULL COMMENT 'This is checkbox type. Q: Used in larger amounts or over longer period than intended',
  `persistent-desire-or-unsuccessful-efforts-to-cut-down-or-control` enum('yes','no') NOT NULL COMMENT 'Checkbox type Q: persistent desire or unsuccessful efforts to cut down or control use',
  `a-great-deal-of-time-spent-in-activities-necessary-to-obtain-sub` enum('yes','no') NOT NULL COMMENT 'checkbox type. Q: A great deal of time spent in activities necessary to obtain substance, use substance or recover from its effects',
  `craving` enum('yes','no') NOT NULL COMMENT 'Q: Craving',
  `failure-to-fulfill-major-role-obligations-at-work-school-or-home` enum('yes','no') NOT NULL COMMENT 'Q: Failure to fulfill major role obligations at work, school, or home due to use',
  `continued-use-despite-recurrent-social-or-interpersonal-problems` enum('yes','no') NOT NULL COMMENT 'Q: Continued use despite recurrent social or interpersonal problems due to use',
  `recurrent-use-in-situations-in-which-physically-hazardous` enum('yes','no') NOT NULL COMMENT 'Q: Recurrent use in situations in which physically hazardous',
  `use-despite-knowledge-of-physical-or-psychological-problems-like` enum('yes','no') NOT NULL COMMENT 'Q: Use despite knowledge of physical or psychological problems likely exacerbated by use',
  `tolerance-need-increased-amounts-or-diminished-effect` enum('yes','no') NOT NULL COMMENT 'Q:Tolerance (need increased amounts or diminished effect)',
  `withdrawal` enum('yes','no') NOT NULL COMMENT 'Q: Withdrawal',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `suicide-assessment`
--

CREATE TABLE `suicide-assessment` (
  `patientUUID` varchar(64) NOT NULL,
  `does-patient-report-suicidal-ideations` enum('yes','no') NOT NULL COMMENT 'Selectbox type Q: Does patient report suicidal ideations ?',
  `note` text NOT NULL,
  `recordChangedByUUID` varchar(64) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`patientUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;