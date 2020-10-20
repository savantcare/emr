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
import clientSideTblOfAppointments from '~/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfAddendums from '~/components/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'
database.register(clientSideTblOfAppointments)
database.register(clientSideTblOfAddendums)

// table that decides which cards to show
import tableStructureForLeftSideView from '~/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import tableStructureForRightSideView from '~/components/non-temporal/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'
database.register(tableStructureForLeftSideView)
database.register(tableStructureForRightSideView)

// body measurement tables
import tableStructureForWeight from '~/components/1time-1row-mField/vital-signs/sub-cts/weight/db/client-side/structure/table.js'
import tableStructureForWaistCircumference from '~/components/1time-1row-mField/vital-signs/sub-cts/waist-circumference/db/client-side/structure/table.js'
import tableStructureForBloodPressure from '~/components/1time-1row-mField/vital-signs/sub-cts/blood-pressure-levels/db/client-side/structure/table.js'
import tableStructureForBloodSugar from '~/components/1time-1row-mField/vital-signs/sub-cts/blood-sugar-levels/db/client-side/structure/table.js'
import tableStructureForOxygenSaturation from '~/components/1time-1row-mField/vital-signs/sub-cts/oxygen-saturation/db/client-side/structure/table.js'
import tableStructureForHeight from '~/components/1time-1row-mField/vital-signs/sub-cts/height/db/client-side/structure/table.js'
import tableStructureForTemperature from '~/components/1time-1row-mField/vital-signs/sub-cts/temperature/db/client-side/structure/table.js'
import tableStructureForPulse from '~/components/1time-1row-mField/vital-signs/sub-cts/pulse/db/client-side/structure/table.js'
database.register(tableStructureForWeight)
database.register(tableStructureForHeight)
database.register(tableStructureForBloodPressure)
database.register(tableStructureForOxygenSaturation)
database.register(tableStructureForBloodSugar)
database.register(tableStructureForWaistCircumference)
database.register(tableStructureForTemperature)
database.register(tableStructureForPulse)

// Screening tables
import tableStructureForScr from '~/components/1time-Mrow-mField/scr/db/client-side/structure/Screening'
import tableStructureForPhq9Master from '~/components/1time-1row-mField/phq9/db/client-side/structure/master-table-of-phq9.js'
import tableStructureForPhq9OfPatient from '~/components/1time-1row-mField/phq9/db/client-side/structure/patient-table-of-phq9.js'
database.register(tableStructureForScr)
database.register(tableStructureForPhq9Master)
database.register(tableStructureForPhq9OfPatient)

// Service statement tables
import tableStructureForSSMaster from '~/components/1time-1row-mField/service-statement/db/client-side/structure/master-table-of-service-statements.js'
import tableStructureForSSOfPatient from '~/components/1time-1row-mField/service-statement/db/client-side/structure/patient-table-of-service-statements.js'
database.register(tableStructureForSSMaster)
database.register(tableStructureForSSOfPatient)

// Past psych history tables
import tableStructureForPsychHistoryMaster from '~/components/1time-1row-mField/past-psych-history/db/client-side/structure/master-table-of-past-psych-history.js'
import tableStructureForPsychHistoryOfPatient from '~/components/1time-1row-mField/past-psych-history/db/client-side/structure/patient-table-of-past-psych-history.js'
database.register(tableStructureForPsychHistoryMaster)
database.register(tableStructureForPsychHistoryOfPatient)

import tableStructureForMedicalReviewOfSystemsMaster from '~/components/1time-1row-mField/medical-review-of-systems/db/client-side/structure/master-table-of-medical-review-of-systems.js'
import tableStructureForMedicalReviewOfSystemsOfPatient from '~/components/1time-1row-mField/medical-review-of-systems/db/client-side/structure/patient-table-of-medical-review-of-systems.js'
database.register(tableStructureForMedicalReviewOfSystemsMaster)
database.register(tableStructureForMedicalReviewOfSystemsOfPatient)

// Mental status exam tables
import tableStructureForMSEMaster from '~/components/1time-1row-mField/mental-status-exam/db/client-side/structure/master-table-of-mental-status-exam.js'
import tableStructureForMSEOfPatient from '~/components/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'
database.register(tableStructureForMSEMaster)
database.register(tableStructureForMSEOfPatient)

// Psych review of systems tables
import tableStructureForPROSMaster from '~/components/1time-1row-mField/psych-review-of-systems/db/client-side/structure/master-table-of-psych-review-of-systems.js'
import tableStructureForPROSOfPatient from '~/components/1time-1row-mField/psych-review-of-systems/db/client-side/structure/patient-table-of-psych-review-of-systems.js'
database.register(tableStructureForPROSMaster)
database.register(tableStructureForPROSOfPatient)

// Other components tables
import tableStructureForRem from '~/components/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'
database.register(tableStructureForRem)

import tableStructureForRec from '~/components/1time-Mrow-1Field/recommendation/db/client-side/structure/recommendations-of-a-patient-table.js'
database.register(tableStructureForRec)

import tableStructureForName from '~/components/1time-1row-mField/name/db/client-side/structure/table.js'
database.register(tableStructureForName)

import tableStructureForDob from '~/components/1time-1row-mField/date-of-birth/db/client-side/structure/patient-table-of-date-of-birth.js'
database.register(tableStructureForDob)

import tableStructureForDx from '~/components/1time-Mrow-mField/dx/db/client-side/structure/Dx.js'
database.register(tableStructureForDx)

import tableStructureForDxa from '~/components/1time-Mrow-mField/dx/db/client-side/structure/Dxa.js'
database.register(tableStructureForDxa)

import tableStructureForGoal from '~/components/1time-Mrow-mField/goal/db/client-side/structure/Goal'
database.register(tableStructureForGoal)

import tableStructureForPhoneNumbers from '~/components/1time-Mrow-mField/phone-numbers/db/client-side/structure/table.js'
database.register(tableStructureForPhoneNumbers)

import tableStructureForPatientDiagnosis from '~/components/1time-Mrow-mField/diagnosis/db/client-side/structure/patient-table-of-diagnosis'
database.register(tableStructureForPatientDiagnosis)

import tableStructureForMasterDiagnosis from '~/components/1time-Mrow-mField/diagnosis/db/client-side/structure/master-table-of-diagnosis'
database.register(tableStructureForMasterDiagnosis)

export default database
