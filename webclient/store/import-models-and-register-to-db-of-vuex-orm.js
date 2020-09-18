// this is file 3 in example

import { Database } from '@vuex-orm/core'
import CtSearch from '~/components/core/search-phrases/search-phrases-of-components-orm'
import CtLifeCycle from '~/components/core/ctMaster/orm-ct-life-cycle'
import Rem from '~/components/pt-info/single/1t-Mrow-1Field/rem/db/vuex-orm/rem-table.js'
import ormName from '~/components/pt-info/single/1t-1row-mField/name/db/orm.js'
import ormWeight from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/weight/db/orm.js'
import ormWaistCircumference from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/waist-circumference/db/orm.js'
import ormBloodPressure from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-pressure/db/orm.js'
import ormBloodSugar from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-sugar/db/orm.js'
import ormOxygenSaturation from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/oxygen-saturation/db/orm.js'
import ormHeight from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/height/db/orm.js'
import ormTemperature from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/temperature/db/orm.js'
import ormPulse from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/pulse/db/orm.js'
import ormDob from '~/components/pt-info/single/1t-1row-mField/date-of-birth/db/orm.js'
import ormPhq9 from '~/components/pt-info/single/1t-1row-mField/phq9/db/orm.js'
import Rec from '~/components/pt-info/single/1t-Mrow-1Field/rec/db/vuex-orm/model.js'
import Dx from '~/components/pt-info/single/1t-Mrow-mField/dx/db/vuex-orm/Dx.js'
import Goal from '~/components/pt-info/single/1t-Mrow-mField/goal/db/vuex-orm/Goal'
import Scr from '~/components/pt-info/single/1t-Mrow-mField/scr/db/vuex-orm/Screening'
import Dxa from '~/components/pt-info/single/1t-Mrow-mField/dx/db/vuex-orm/Dxa.js'
import phoneNumbers from '~/components/pt-info/single/1t-Mrow-mField/phone-numbers/db/vuex-orm/orm.js'
import objOrm from '~/components/pt-info/single/1t-1row-mField/common-for-all-components/db/orm.js'

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
