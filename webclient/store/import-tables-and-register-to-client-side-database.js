// this is file 3 in example

import { Database } from '@vuex-orm/core'
import tableSearch from '~/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'
import tableLifeCycle from '~/components/core/ctMaster/orm-ct-life-cycle'
import tableRem from '~/components/pt-info/single/1t-Mrow-1Field/reminder/db/client-side/structure/rem-table.js'
import tableSSMaster from '~/components/pt-info/single/1t-Mrow-1Field/service-statement/db/client-side/structure/table-master-list-of-ss.js'
import tableName from '~/components/pt-info/single/1t-1row-mField/name/db/client-side/structure/table.js'
import tableWeight from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/weight/db/table.js'
import tableWaistCircumference from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/waist-circumference/db/table.js'
import tableBloodPressure from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-pressure/db/table.js'
import tableBloodSugar from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-sugar/db/table.js'
import tableOxygenSaturation from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/oxygen-saturation/db/table.js'
import tableHeight from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/height/db/table.js'
import tableTemperature from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/temperature/db/table.js'
import tablePulse from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/pulse/db/table.js'
import tableDob from '~/components/pt-info/single/1t-1row-mField/date-of-birth/db/client-side/structure/table.js'
import tablePhq9 from '~/components/pt-info/single/1t-1row-mField/phq9/db/table.js'
import tableRec from '~/components/pt-info/single/1t-Mrow-1Field/rec/db/client-side/model.js'
import tableDx from '~/components/pt-info/single/1t-Mrow-mField/dx/db/client-side/Dx.js'
import tableGoal from '~/components/pt-info/single/1t-Mrow-mField/goal/db/client-side/Goal'
import tableScr from '~/components/pt-info/single/1t-Mrow-mField/scr/db/client-side/Screening'
import tableDxa from '~/components/pt-info/single/1t-Mrow-mField/dx/db/client-side/Dxa.js'
import tablePhoneNumbers from '~/components/pt-info/single/1t-Mrow-mField/phone-numbers/db/client-side/table.js'
import tableCommon from '~/components/pt-info/single/1t-1row-mField/common-for-all-components/db/table.js'

const database = new Database()

database.register(tableSearch)
database.register(tableRem)
database.register(tableName)
database.register(tableWeight)
database.register(tableHeight)
database.register(tableBloodPressure)
database.register(tableOxygenSaturation)
database.register(tableBloodSugar)
database.register(tableWaistCircumference)
database.register(tableTemperature)
database.register(tablePulse)
database.register(tableDob)
database.register(tablePhq9)
database.register(tableRec)
database.register(tableDx)
database.register(tableGoal)
database.register(tableScr)
database.register(tableLifeCycle)
database.register(tableDxa)
database.register(tablePhoneNumbers)
database.register(tableCommon)
database.register(tableSSMaster)
export default database
