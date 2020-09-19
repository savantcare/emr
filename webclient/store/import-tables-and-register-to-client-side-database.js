// this is file 3 in example

import { Database } from '@vuex-orm/core'
import tableStructureForSearch from '~/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'
import tableStructureForLifeCycle from '~/components/core/ctMaster/db/client-side/structure/orm-ct-life-cycle'
import tableStructureForRem from '~/components/pt-info/single/1t-Mrow-1Field/reminder/db/client-side/structure/rem-table.js'
import tableStructureForSSMaster from '~/components/pt-info/single/1t-Mrow-1Field/service-statement/db/client-side/structure/table-master-list-of-ss.js'
import tableStructureForName from '~/components/pt-info/single/1t-1row-mField/name/db/client-side/structure/table.js'
import tableStructureForWeight from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/weight/db/client-side/structure/table.js'
import tableStructureForWaistCircumference from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/waist-circumference/db/client-side/structure/table.js'
import tableStructureForBloodPressure from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-pressure/db/client-side/structure/table.js'
import tableStructureForBloodSugar from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-sugar/db/client-side/structure/table.js'
import tableStructureForOxygenSaturation from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/oxygen-saturation/db/client-side/structure/table.js'
import tableStructureForHeight from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/height/db/client-side/structure/table.js'
import tableStructureForTemperature from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/temperature/db/client-side/structure/table.js'
import tableStructureForPulse from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/pulse/db/client-side/structure/table.js'
import tableStructureForDob from '~/components/pt-info/single/1t-1row-mField/date-of-birth/db/client-side/structure/table.js'
import tableStructureForRec from '~/components/pt-info/single/1t-Mrow-1Field/rec/db/client-side/structure/model.js'
import tableStructureForDx from '~/components/pt-info/single/1t-Mrow-mField/dx/db/client-side/structure/Dx.js'
import tableStructureForDxa from '~/components/pt-info/single/1t-Mrow-mField/dx/db/client-side/structure/Dxa.js'
import tableStructureForGoal from '~/components/pt-info/single/1t-Mrow-mField/goal/db/client-side/structure/Goal'
import tableStructureForScr from '~/components/pt-info/single/1t-Mrow-mField/scr/db/client-side/structure/Screening'
import tableStructureForPhq9 from '~/components/pt-info/single/1t-1row-mField/phq9/db/client-side/structure/table.js'
import tableStructureForPhoneNumbers from '~/components/pt-info/single/1t-Mrow-mField/phone-numbers/db/client-side/structure/table.js'
import tableStructureForCommon from '~/components/pt-info/single/1t-1row-mField/common-for-all-components/db/client-side/structure/table.js'

const database = new Database()

database.register(tableStructureForSearch)
database.register(tableStructureForRem)
database.register(tableStructureForName)
database.register(tableStructureForWeight)
database.register(tableStructureForHeight)
database.register(tableStructureForBloodPressure)
database.register(tableStructureForOxygenSaturation)
database.register(tableStructureForBloodSugar)
database.register(tableStructureForWaistCircumference)
database.register(tableStructureForTemperature)
database.register(tableStructureForPulse)
database.register(tableStructureForDob)
database.register(tableStructureForPhq9)
database.register(tableStructureForRec)
database.register(tableStructureForDx)
database.register(tableStructureForGoal)
database.register(tableStructureForScr)
database.register(tableStructureForLifeCycle)
database.register(tableStructureForDxa)
database.register(tableStructureForPhoneNumbers)
database.register(tableStructureForCommon)
database.register(tableStructureForSSMaster)
export default database
