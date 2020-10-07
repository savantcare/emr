// this is file 3 in example

import { Database } from '@vuex-orm/core'
const database = new Database()

// Core tables
import tableStructureForSearch from '~/components/others/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'
import tableStructureForLifeCycle from '~/components/others/ctMaster/db/client-side/structure/orm-ct-life-cycle'
import tableStructureForCommon from '~/components/ptinfo-single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'
import tableStructureForStoreMessageFromOtherComponent from '~/components/ptinfo-combined/feed/db/client-side/structure/store-messages-from-other-components.js'

database.register(tableStructureForSearch)
database.register(tableStructureForLifeCycle)
database.register(tableStructureForCommon)
database.register(tableStructureForStoreMessageFromOtherComponent)

// Appointments
import clientSideTblOfAppointments from '~/components/ptinfo-single/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfAmendments from '~/components/ptinfo-single/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'
database.register(clientSideTblOfAppointments)
database.register(clientSideTblOfAmendments)

// table that decides which cards to show
import tableStructureForMultiTimeStateView from '~/components/others/layer-1-left-side-components/db/client-side/structure/mts-table.js'
import tableStructureForRightSideView from '~/components/others/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'
database.register(tableStructureForMultiTimeStateView)
database.register(tableStructureForRightSideView)

// body measurement tables
import tableStructureForWeight from '~/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/weight/db/client-side/structure/table.js'
import tableStructureForWaistCircumference from '~/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/waist-circumference/db/client-side/structure/table.js'
import tableStructureForBloodPressure from '~/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/blood-pressure-levels/db/client-side/structure/table.js'
import tableStructureForBloodSugar from '~/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/blood-sugar-levels/db/client-side/structure/table.js'
import tableStructureForOxygenSaturation from '~/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/oxygen-saturation/db/client-side/structure/table.js'
import tableStructureForHeight from '~/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/height/db/client-side/structure/table.js'
import tableStructureForTemperature from '~/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/temperature/db/client-side/structure/table.js'
import tableStructureForPulse from '~/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/pulse/db/client-side/structure/table.js'
database.register(tableStructureForWeight)
database.register(tableStructureForHeight)
database.register(tableStructureForBloodPressure)
database.register(tableStructureForOxygenSaturation)
database.register(tableStructureForBloodSugar)
database.register(tableStructureForWaistCircumference)
database.register(tableStructureForTemperature)
database.register(tableStructureForPulse)

// Screening tables
import tableStructureForScr from '~/components/ptinfo-single/1time-Mrow-mField/scr/db/client-side/structure/Screening'
import tableStructureForPhq9Master from '~/components/ptinfo-single/1time-1row-mField/phq9/db/client-side/structure/master-table-of-phq9.js'
import tableStructureForPhq9OfPatient from '~/components/ptinfo-single/1time-1row-mField/phq9/db/client-side/structure/patient-table-of-phq9.js'
database.register(tableStructureForScr)
database.register(tableStructureForPhq9Master)
database.register(tableStructureForPhq9OfPatient)

// Service statement tables
import tableStructureForSSMaster from '~/components/ptinfo-single/1time-Mrow-1Field/service-statement/db/client-side/structure/master-table-of-service-statements.js'
import tableStructureForSSOfPatient from '~/components/ptinfo-single/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'
database.register(tableStructureForSSMaster)
database.register(tableStructureForSSOfPatient)

// Mental status exam tables
import tableStructureForMSEMaster from '~/components/ptinfo-single/1time-1row-mField/mental-status-exam/db/client-side/structure/master-table-of-mental-status-exam.js'
import tableStructureForMSEOfPatient from '~/components/ptinfo-single/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'
database.register(tableStructureForMSEMaster)
database.register(tableStructureForMSEOfPatient)

// Psych review of systems tables
import tableStructureForPROSMaster from '~/components/ptinfo-single/1time-1row-mField/psych-review-of-systems/db/client-side/structure/master-table-of-psych-review-of-systems.js'
import tableStructureForPROSOfPatient from '~/components/ptinfo-single/1time-1row-mField/psych-review-of-systems/db/client-side/structure/patient-table-of-psych-review-of-systems.js'
database.register(tableStructureForPROSMaster)
database.register(tableStructureForPROSOfPatient)

// Other components tables
import tableStructureForRem from '~/components/ptinfo-single/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'
import tableStructureForName from '~/components/ptinfo-single/1time-1row-mField/name/db/client-side/structure/table.js'
import tableStructureForDob from '~/components/ptinfo-single/1time-1row-mField/date-of-birth/db/client-side/structure/table.js'
import tableStructureForRec from '~/components/ptinfo-single/1time-Mrow-1Field/rec/db/client-side/structure/model.js'
import tableStructureForDx from '~/components/ptinfo-single/1time-Mrow-mField/dx/db/client-side/structure/Dx.js'
import tableStructureForDxa from '~/components/ptinfo-single/1time-Mrow-mField/dx/db/client-side/structure/Dxa.js'
import tableStructureForGoal from '~/components/ptinfo-single/1time-Mrow-mField/goal/db/client-side/structure/Goal'
import tableStructureForPhoneNumbers from '~/components/ptinfo-single/1time-Mrow-mField/phone-numbers/db/client-side/structure/table.js'
import tableStructureForPatientDiagnosis from '~/components/ptinfo-single/1time-Mrow-mField/diagnosis/db/client-side/structure/patient-table-of-diagnosis'
import tableStructureForMasterDiagnosis from '~/components/ptinfo-single/1time-Mrow-mField/diagnosis/db/client-side/structure/master-table-of-diagnosis'
database.register(tableStructureForRem)
database.register(tableStructureForName)
database.register(tableStructureForDob)
database.register(tableStructureForRec)
database.register(tableStructureForDx)
database.register(tableStructureForGoal)
database.register(tableStructureForDxa)
database.register(tableStructureForPhoneNumbers)
database.register(tableStructureForPatientDiagnosis)
database.register(tableStructureForMasterDiagnosis)

export default database
