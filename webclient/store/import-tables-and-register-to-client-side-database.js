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
import tableStructureForRightSideView from '~/components/non-temporal/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'
database.register(tableStructureForLeftSideView)
database.register(tableStructureForRightSideView)

// body measurement tables
import tableStructureForWeight from '~/components/temporal/vital-signs/sub-cts/weight/db/client-side/structure/table.js'
import tableStructureForWaistCircumference from '~/components/temporal/vital-signs/sub-cts/waist-circumference/db/client-side/structure/table.js'
import tableStructureForBloodPressure from '~/components/temporal/vital-signs/sub-cts/blood-pressure-levels/db/client-side/structure/table.js'
import tableStructureForBloodSugar from '~/components/temporal/vital-signs/sub-cts/blood-sugar-levels/db/client-side/structure/table.js'
import tableStructureForOxygenSaturation from '~/components/temporal/vital-signs/sub-cts/oxygen-saturation/db/client-side/structure/table.js'
import tableStructureForHeight from '~/components/temporal/vital-signs/sub-cts/height/db/client-side/structure/table.js'
import tableStructureForTemperature from '~/components/temporal/vital-signs/sub-cts/temperature/db/client-side/structure/table.js'
import tableStructureForPulse from '~/components/temporal/vital-signs/sub-cts/pulse/db/client-side/structure/table.js'
database.register(tableStructureForWeight)
database.register(tableStructureForHeight)
database.register(tableStructureForBloodPressure)
database.register(tableStructureForOxygenSaturation)
database.register(tableStructureForBloodSugar)
database.register(tableStructureForWaistCircumference)
database.register(tableStructureForTemperature)
database.register(tableStructureForPulse)

// Screening tables
import tableStructureForScr from '~/components/temporal/screens/db/client-side/structure/Screening'
import tableStructureForPhq9Master from '~/components/temporal/phq9/db/client-side/structure/master-table-of-phq9.js'
import tableStructureForPhq9OfPatient from '~/components/temporal/phq9/db/client-side/structure/patient-table-of-phq9.js'
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

// Mental status exam tables
import tableStructureForMSEMaster from '~/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-all-select-options.js'
import tableStructureForMSEOfPatient from '~/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'
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
