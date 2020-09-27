// this is file 3 in example

import { Database } from '@vuex-orm/core'
const database = new Database()

// Core tables
import tableStructureForSearch from '~/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'
import tableStructureForLifeCycle from '~/components/core/ctMaster/db/client-side/structure/orm-ct-life-cycle'
import tableStructureForCommon from '~/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'
database.register(tableStructureForSearch)
database.register(tableStructureForLifeCycle)
database.register(tableStructureForCommon)

// Appointments
import clientSideTblOfAppointments from '@/components/core/mts-view-layer-header/db/client-side/structure/appointment-client-side-table.js'
database.register(clientSideTblOfAppointments)

// table that decides which cards to show
import tableStructureForLeftSideView from '@/components/core/manage-mts-view-layer-cards/db/client-side/structure/table.js'
database.register(tableStructureForLeftSideView)

// body measurement tables
import tableStructureForWeight from '~/components/pt-info/single/1time-1row-mField/bm/sub-cts/weight/db/client-side/structure/table.js'
import tableStructureForWaistCircumference from '~/components/pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/db/client-side/structure/table.js'
import tableStructureForBloodPressure from '~/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/db/client-side/structure/table.js'
import tableStructureForBloodSugar from '~/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/db/client-side/structure/table.js'
import tableStructureForOxygenSaturation from '~/components/pt-info/single/1time-1row-mField/bm/sub-cts/oxygen-saturation/db/client-side/structure/table.js'
import tableStructureForHeight from '~/components/pt-info/single/1time-1row-mField/bm/sub-cts/height/db/client-side/structure/table.js'
import tableStructureForTemperature from '~/components/pt-info/single/1time-1row-mField/bm/sub-cts/temperature/db/client-side/structure/table.js'
import tableStructureForPulse from '~/components/pt-info/single/1time-1row-mField/bm/sub-cts/pulse/db/client-side/structure/table.js'
database.register(tableStructureForWeight)
database.register(tableStructureForHeight)
database.register(tableStructureForBloodPressure)
database.register(tableStructureForOxygenSaturation)
database.register(tableStructureForBloodSugar)
database.register(tableStructureForWaistCircumference)
database.register(tableStructureForTemperature)
database.register(tableStructureForPulse)

// Screening tables
import tableStructureForScr from '~/components/pt-info/single/1time-Mrow-mField/scr/db/client-side/structure/Screening'
import tableStructureForPhq9 from '~/components/pt-info/single/1time-1row-mField/phq9/db/client-side/structure/table.js'
database.register(tableStructureForScr)
database.register(tableStructureForPhq9)

// Service statement tables
import tableStructureForSSMaster from '~/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/structure/master-table-of-service-statements.js'
import tableStructureForSSOfPatient from '~/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'
database.register(tableStructureForSSMaster)
database.register(tableStructureForSSOfPatient)

// Mental status exam tables
import tableStructureForMSEMaster from '~/components/pt-info/single/1time-1row-mField/mental-status-exam/db/client-side/structure/master-table-of-mental-status-exam.js'
import tableStructureForMSEOfPatient from '~/components/pt-info/single/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'
database.register(tableStructureForMSEMaster)
database.register(tableStructureForMSEOfPatient)

// Psych review of systems tables
import tableStructureForPROSMaster from '~/components/pt-info/single/1time-1row-mField/psych-review-of-systems/db/client-side/structure/master-table-of-psych-review-of-systems.js'
import tableStructureForPROSOfPatient from '~/components/pt-info/single/1time-1row-mField/psych-review-of-systems/db/client-side/structure/patient-table-of-psych-review-of-systems.js'
database.register(tableStructureForPROSMaster)
database.register(tableStructureForPROSOfPatient)

// Other components tables
import tableStructureForRem from '~/components/pt-info/single/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'
import tableStructureForName from '~/components/pt-info/single/1time-1row-mField/name/db/client-side/structure/table.js'
import tableStructureForDob from '~/components/pt-info/single/1time-1row-mField/date-of-birth/db/client-side/structure/table.js'
import tableStructureForRec from '~/components/pt-info/single/1time-Mrow-1Field/rec/db/client-side/structure/model.js'
import tableStructureForDx from '~/components/pt-info/single/1time-Mrow-mField/dx/db/client-side/structure/Dx.js'
import tableStructureForDxa from '~/components/pt-info/single/1time-Mrow-mField/dx/db/client-side/structure/Dxa.js'
import tableStructureForGoal from '~/components/pt-info/single/1time-Mrow-mField/goal/db/client-side/structure/Goal'
import tableStructureForPhoneNumbers from '~/components/pt-info/single/1time-Mrow-mField/phone-numbers/db/client-side/structure/table.js'
database.register(tableStructureForRem)
database.register(tableStructureForName)
database.register(tableStructureForDob)
database.register(tableStructureForRec)
database.register(tableStructureForDx)
database.register(tableStructureForGoal)
database.register(tableStructureForDxa)
database.register(tableStructureForPhoneNumbers)

export default database
