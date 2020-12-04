// this is file 3 in example

import { Database } from '@vuex-orm/core'
const database = new Database()

// Core tables
import tableStructureForSearch from '~/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'
//import tableStructureForLifeCycle from '~/components/non-temporal/ctMaster/db/client-side/structure/orm-ct-life-cycle'
import tableStructureForCommon from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import tableStructureForStoreMessageFromOtherComponent from '~/components/non-temporal/feed/db/client-side/structure/store-messages-from-other-components.js'

database.register(tableStructureForSearch)
//database.register(tableStructureForLifeCycle)
database.register(tableStructureForCommon)
database.register(tableStructureForStoreMessageFromOtherComponent)

// Appointments
import clientTblOfAppointments from '~/components/patient-data/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientTblOfAddendums from '~/components/patient-data/amendment/db/client-side/structure/amendment-client-side-table.js'
database.register(clientTblOfAppointments)
database.register(clientTblOfAddendums)

// table that decides which cards to show
import tableStructureForLeftSideView from '~/components/papers/note-view/lhs/container/db/client-side/structure/left-hand-side-table-of-cards.js'
import tableStructureForRightSideView from '~/components/non-temporal/search-phrases/db/client-side/structure/dynamic-cards-table.js'
database.register(tableStructureForLeftSideView)
database.register(tableStructureForRightSideView)

// body measurement tables
import tableStructureForWeight from '~/components/patient-data/weight/db/client-side/structure/weight-of-a-patient-table.js'
database.register(tableStructureForWeight)

import tableStructureForHeight from '~/components/patient-data/height/db/client-side/structure/height-of-a-patient-table.js'
database.register(tableStructureForHeight)

import tableStructureForTemperature from '~/components/patient-data/temperature/db/client-side/structure/temperature-of-a-patient-table.js'
database.register(tableStructureForTemperature)

import tableStructureForPulse from '~/components/patient-data/pulse/db/client-side/structure/pulse-of-a-patient-table.js'
database.register(tableStructureForPulse)

import tableStructureForBloodPressure from '~/components/patient-data/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'
database.register(tableStructureForBloodPressure)

import tableStructureForBloodSugar from '~/components/patient-data/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'
database.register(tableStructureForBloodSugar)

import waistCircumferenceClientTbl from '~/components/patient-data/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'
database.register(waistCircumferenceClientTbl)

import bmiClientTbl from '~/components/patient-data/bmi/db/client-side/structure/bmi-of-a-patient-table.js'
database.register(bmiClientTbl)

import oxygenSaturationClientTbl from '~/components/patient-data/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'
database.register(oxygenSaturationClientTbl)

// Screening tables
import tableStructureForScr from '~/components/patient-data/screens/db/client-side/structure/screens-of-a-patient-table.js'
import tableStructureForPhq9Master from '~/components/patient-data/phq9/db/client-side/structure/phq9-all-select-options.js'
import tableStructureForPhq9OfPatient from '~/components/patient-data/phq9/db/client-side/structure/phq9-of-a-patient-table.js'
database.register(tableStructureForScr)
database.register(tableStructureForPhq9Master)
database.register(tableStructureForPhq9OfPatient)

// Service statement tables
import tableStructureForSSOfPatient from '~/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
database.register(tableStructureForSSOfPatient)

// Past psych history tables
import tableStructureForPsychHistoryOfPatient from '~/components/patient-data/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'
database.register(tableStructureForPsychHistoryOfPatient)

import tableStructureForMedicalReviewOfSystemsMaster from '~/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-all-select-options.js'
import tableStructureForMedicalReviewOfSystemsOfPatient from '~/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'
database.register(tableStructureForMedicalReviewOfSystemsMaster)
database.register(tableStructureForMedicalReviewOfSystemsOfPatient)

// Examination tables
import tableStructureForMSEMaster from '~/components/patient-data/examination/db/client-side/structure/examination-all-select-options.js'
import tableStructureForMSEOfPatient from '~/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'
database.register(tableStructureForMSEMaster)
database.register(tableStructureForMSEOfPatient)

// Psych review of systems tables
import tableStructureForPROSMaster from '~/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-all-select-options.js'
import tableStructureForPROSOfPatient from '~/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
database.register(tableStructureForPROSMaster)
database.register(tableStructureForPROSOfPatient)

// Other components tables

// START: Each field can take multiple values at 1 time in the temporal database

import tableStructureForAllergies from '~/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
database.register(tableStructureForAllergies)

import tableStructureForChiefComplaint from '~/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
database.register(tableStructureForChiefComplaint)

import tableStructureForRec from '~/components/patient-data/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
database.register(tableStructureForRec)

import tableStructureForMiscNotes from '~/components/patient-data/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'
database.register(tableStructureForMiscNotes)

import tableStructureForPlanComments from '~/components/patient-data/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
database.register(tableStructureForPlanComments)

import tableStructureForSHx from '~/components/patient-data/social-history/db/client-side/structure/social-history-of-a-patient-table.js'
database.register(tableStructureForSHx)

import tableStructureForProcessNotes from '~/components/patient-data/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
database.register(tableStructureForProcessNotes)

import tableStructureForFH from '~/components/patient-data/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
database.register(tableStructureForFH)

import tableStructureForMH from '~/components/patient-data/medical-history/db/client-side/structure/medical-history-of-a-patient-table.js'
database.register(tableStructureForMH)

import tableStructureForMO from '~/components/patient-data/medication-orders/db/client-side/structure/medication-order-of-a-patient-table.js'
database.register(tableStructureForMO)

import tableStructureForRem from '~/components/patient-data/reminders/db/client-side/structure/reminders-of-a-patient-table.js'
database.register(tableStructureForRem)

// END

import tableStructureForName from '~/components/patient-data/name/db/client-side/structure/name-of-a-patient-table.js'
database.register(tableStructureForName)

import tableStructureForDob from '~/components/patient-data/date-of-birth/db/client-side/structure/table.js'
database.register(tableStructureForDob)

import tableStructureForGoal from '~/components/patient-data/goals/db/client-side/structure/goals-of-a-patient-table.js'
database.register(tableStructureForGoal)

import tableStructureForPhoneNumbers from '~/components/patient-data/phone-numbers/db/client-side/structure/table.js'
database.register(tableStructureForPhoneNumbers)

import tableStructureForPatientDiagnosis from '~/components/patient-data/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
database.register(tableStructureForPatientDiagnosis)

export default database
