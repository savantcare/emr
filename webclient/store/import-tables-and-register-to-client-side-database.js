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
import clientTblOfAppointments from '~/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientTblOfAddendums from '~/components/temporal/amendment/db/client-side/structure/amendment-client-side-table.js'
database.register(clientTblOfAppointments)
database.register(clientTblOfAddendums)

// table that decides which cards to show
import tableStructureForLeftSideView from '~/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import tableStructureForRightSideView from '~/components/non-temporal/search-phrases/db/client-side/structure/dynamic-cards-table.js'
database.register(tableStructureForLeftSideView)
database.register(tableStructureForRightSideView)

// body measurement tables
import tableStructureForWeight from '~/components/temporal/weight/db/client-side/structure/weight-of-a-patient-table.js'
database.register(tableStructureForWeight)

import tableStructureForHeight from '~/components/temporal/height/db/client-side/structure/height-of-a-patient-table.js'
database.register(tableStructureForHeight)

import tableStructureForTemperature from '~/components/temporal/temperature/db/client-side/structure/temperature-of-a-patient-table.js'
database.register(tableStructureForTemperature)

import tableStructureForPulse from '~/components/temporal/pulse/db/client-side/structure/pulse-of-a-patient-table.js'
database.register(tableStructureForPulse)

import tableStructureForBloodPressure from '~/components/temporal/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'
database.register(tableStructureForBloodPressure)

import tableStructureForBloodSugar from '~/components/temporal/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'
database.register(tableStructureForBloodSugar)

import waistCircumferenceClientTbl from '@/components/temporal/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'
database.register(waistCircumferenceClientTbl)

import bmiClientTbl from '@/components/temporal/bmi/db/client-side/structure/bmi-of-a-patient-table.js'
database.register(bmiClientTbl)

import oxygenSaturationClientTbl from '@/components/temporal/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'
database.register(oxygenSaturationClientTbl)

// Screening tables
import tableStructureForScr from '~/components/temporal/screens/db/client-side/structure/screens-of-a-patient-table.js'
import tableStructureForPhq9Master from '~/components/temporal/phq9/db/client-side/structure/phq9-all-select-options.js'
import tableStructureForPhq9OfPatient from '~/components/temporal/phq9/db/client-side/structure/phq9-of-a-patient-table.js'
database.register(tableStructureForScr)
database.register(tableStructureForPhq9Master)
database.register(tableStructureForPhq9OfPatient)

// Service statement tables
import tableStructureForSSMaster from '~/components/temporal/service-statements/db/client-side/structure/service-statements-all-select-options.js'
database.register(tableStructureForSSMaster)
import tableStructureForSSOfPatient from '~/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
database.register(tableStructureForSSOfPatient)

// Past psych history tables
import tableStructureForPsychHistoryOfPatient from '~/components/temporal/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'
database.register(tableStructureForPsychHistoryOfPatient)

import tableStructureForMedicalReviewOfSystemsMaster from '~/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-all-select-options.js'
import tableStructureForMedicalReviewOfSystemsOfPatient from '~/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'
database.register(tableStructureForMedicalReviewOfSystemsMaster)
database.register(tableStructureForMedicalReviewOfSystemsOfPatient)

// Examination tables
import tableStructureForMSEMaster from '~/components/temporal/examination/db/client-side/structure/examination-all-select-options.js'
import tableStructureForMSEOfPatient from '~/components/temporal/examination/db/client-side/structure/examination-of-a-patient-table.js'
database.register(tableStructureForMSEMaster)
database.register(tableStructureForMSEOfPatient)

// Psych review of systems tables
import tableStructureForPROSMaster from '~/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-all-select-options.js'
import tableStructureForPROSOfPatient from '~/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
database.register(tableStructureForPROSMaster)
database.register(tableStructureForPROSOfPatient)

// Other components tables

// START: Each field can take multiple values at 1 time in the temporal database

import tableStructureForAllergies from '~/components/temporal/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
database.register(tableStructureForAllergies)

import tableStructureForChiefComplaint from '~/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
database.register(tableStructureForChiefComplaint)

import tableStructureForFH from '~/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
database.register(tableStructureForFH)

import tableStructureForMiscNotes from '~/components/temporal/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'
database.register(tableStructureForMiscNotes)

import tableStructureForPlanComments from '~/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
database.register(tableStructureForPlanComments)

import tableStructureForProcessNotes from '~/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
database.register(tableStructureForProcessNotes)

import tableStructureForRec from '~/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
database.register(tableStructureForRec)

import tableStructureForRem from '~/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'
database.register(tableStructureForRem)

// END

import tableStructureForName from '~/components/temporal/name/db/client-side/structure/name-of-a-patient-table.js'
database.register(tableStructureForName)

import tableStructureForDob from '~/components/temporal/date-of-birth/db/client-side/structure/table.js'
database.register(tableStructureForDob)

import tableStructureForGoal from '~/components/temporal/goals/db/client-side/structure/goals-of-a-patient-table.js'
database.register(tableStructureForGoal)

import tableStructureForPhoneNumbers from '~/components/temporal/phone-numbers/db/client-side/structure/table.js'
database.register(tableStructureForPhoneNumbers)

import tableStructureForPatientDiagnosis from '~/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
database.register(tableStructureForPatientDiagnosis)

export default database
