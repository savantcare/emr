// this is file 3 in example

import { Database } from '@vuex-orm/core'
import CtSearch from '~/components/core/search-phrases/db/client-side/search-phrases-of-components-table'
import CtLifeCycle from '~/components/core/ctMaster/orm-ct-life-cycle'
import Rem from '~/components/pt-info/single/1t-Mrow-1Field/rem/db/client-side/rem-table.js'
import ormName from '~/components/pt-info/single/1t-1row-mField/name/db/table.js'
import ormWeight from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/weight/db/table.js'
import ormWaistCircumference from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/waist-circumference/db/table.js'
import ormBloodPressure from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-pressure/db/table.js'
import ormBloodSugar from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-sugar/db/table.js'
import ormOxygenSaturation from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/oxygen-saturation/db/table.js'
import ormHeight from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/height/db/table.js'
import ormTemperature from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/temperature/db/table.js'
import ormPulse from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/pulse/db/table.js'
import ormDob from '~/components/pt-info/single/1t-1row-mField/date-of-birth/db/table.js'
import ormPhq9 from '~/components/pt-info/single/1t-1row-mField/phq9/db/table.js'
import Rec from '~/components/pt-info/single/1t-Mrow-1Field/rec/db/client-side/model.js'
import Dx from '~/components/pt-info/single/1t-Mrow-mField/dx/db/client-side/Dx.js'
import Goal from '~/components/pt-info/single/1t-Mrow-mField/goal/db/client-side/Goal'
import Scr from '~/components/pt-info/single/1t-Mrow-mField/scr/db/client-side/Screening'
import Dxa from '~/components/pt-info/single/1t-Mrow-mField/dx/db/client-side/Dxa.js'
import phoneNumbers from '~/components/pt-info/single/1t-Mrow-mField/phone-numbers/db/client-side/table.js'
import objOrm from '~/components/pt-info/single/1t-1row-mField/common-for-all-components/db/table.js'

const database = new Database()

database.register(CtSearch)
database.register(Rem)
database.register(ormName)
database.register(ormWeight)
database.register(ormHeight)
database.register(ormBloodPressure)
database.register(ormOxygenSaturation)
database.register(ormBloodSugar)
database.register(ormWaistCircumference)
database.register(ormTemperature)
database.register(ormPulse)
database.register(ormDob)
database.register(ormPhq9)
database.register(Rec)
database.register(Dx)
database.register(Goal)
database.register(Scr)
database.register(CtLifeCycle)
database.register(Dxa)
database.register(phoneNumbers)
database.register(objOrm)

export default database
