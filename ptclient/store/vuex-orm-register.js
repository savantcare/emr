// this is file 3 in example

import { Database } from '@vuex-orm/core'
import CtSearch from '~/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
import Hworld from '~/cts/book/c04-orm-model/db/vuex-orm/helloworld.js'
import HworldCh7 from '~/cts/book/c07-element-orm-connect-many-rows/db/vuex-orm/helloworld.js'
import HworldCh10 from '~/cts/book/c10-system-versioned-vl-data/db/vuex-orm/helloworld.js'
import CtLifeCycle from '@/cts/core/ctMaster/orm-ct-life-cycle'
import Rem from '~/cts/spi/1t-Mr1f/rem/db/vuex-orm/rem.js'
import ormName from '~/cts/spi/1t-1rMf/name/db/orm.js'
import ormWeight from '~/cts/spi/1t-1rMf/bm/sub-cts/weight/db/orm.js'
import ormWaistCircumference from '~/cts/spi/1t-1rMf/bm/sub-cts/waist-circumference/db/orm.js'
import ormBloodPressure from '~/cts/spi/1t-1rMf/bm/sub-cts/blood-pressure/db/orm.js'
import ormBloodSugar from '~/cts/spi/1t-1rMf/bm/sub-cts/blood-sugar/db/orm.js'
import ormOxygenSaturation from '~/cts/spi/1t-1rMf/bm/sub-cts/oxygen-saturation/db/orm.js'
import ormHeight from '~/cts/spi/1t-1rMf/bm/sub-cts/height/db/orm.js'
import ormTemperature from '~/cts/spi/1t-1rMf/bm/sub-cts/temperature/db/orm.js'
import ormPulse from '~/cts/spi/1t-1rMf/bm/sub-cts/pulse/db/orm.js'
import ormDob from '~/cts/spi/1t-1rMf/date-of-birth/db/orm.js'
import ormPhq9 from '~/cts/spi/1t-1rMf/phq9/db/orm-phq9.js'
import Rex from '~/cts/spi/1t-Mr1f/rec/vuex-orm/model.js'
import Dx from '@/models/Dx'
import Goal from '@/models/Goal'
import Scr from '@/models/Screening'
import Dxa from '@/models/Dxa'

const database = new Database()

database.register(CtSearch)
database.register(Hworld)
database.register(HworldCh7)
database.register(HworldCh10)
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
database.register(Scr)
database.register(CtLifeCycle)
database.register(Dxa)

export default database
