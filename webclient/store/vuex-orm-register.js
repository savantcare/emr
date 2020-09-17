// this is file 3 in example

import { Database } from '@vuex-orm/core'
import CtLifeCycle from '@/cts/core/ctMaster/orm-ct-life-cycle'
import Dx from '@/models/Dx'
import Goal from '@/models/Goal'
import Dxa from '@/models/Dxa'
import CtSearch from '~/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
import Rem from '~/cts/spi/1t-Mrow-1Field/rem/db/vuex-orm/orm.js'

import ormScrMaster from '~/cts/spi/1t-Mrow-1Field/scr/db/vuex-orm/orm-scr-master-list.js'
import ormScr from '~/cts/spi/1t-Mrow-1Field/scr/db/vuex-orm/orm-scr-of-pt.js'
import ormName from '~/cts/spi/1t-1row-mField/name/db/orm.js'
import ormWeight from '~/cts/spi/1t-1row-mField/bm/sub-cts/weight/db/orm.js'
import ormWaistCircumference from '~/cts/spi/1t-1row-mField/bm/sub-cts/waist-circumference/db/orm.js'
import ormBloodPressure from '~/cts/spi/1t-1row-mField/bm/sub-cts/blood-pressure/db/orm.js'
import ormBloodSugar from '~/cts/spi/1t-1row-mField/bm/sub-cts/blood-sugar/db/orm.js'
import ormOxygenSaturation from '~/cts/spi/1t-1row-mField/bm/sub-cts/oxygen-saturation/db/orm.js'
import ormHeight from '~/cts/spi/1t-1row-mField/bm/sub-cts/height/db/orm.js'
import ormTemperature from '~/cts/spi/1t-1row-mField/bm/sub-cts/temperature/db/orm.js'
import ormPulse from '~/cts/spi/1t-1row-mField/bm/sub-cts/pulse/db/orm.js'
import ormDob from '~/cts/spi/1t-1row-mField/date-of-birth/db/orm.js'
import ormPhq9 from '~/cts/spi/1t-1row-mField/phq9/db/orm.js'
import Rex from '~/cts/spi/1t-Mrow-1Field/rec/db/vuex-orm/model.js'
import phoneNumbers from '~/cts/spi/1t-Mrow-mField/phone-numbers/db/vuex-orm/orm.js'
import objOrm from '~/cts/spi/1t-1row-mField/common-for-all-components/db/orm.js'

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
database.register(Rex)
database.register(Dx)
database.register(Goal)
database.register(ormScrMaster)
database.register(ormScr)
database.register(CtLifeCycle)
database.register(Dxa)
database.register(phoneNumbers)
database.register(objOrm)

export default database
