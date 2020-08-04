// this is file 3 in example

import { Database } from '@vuex-orm/core'
import CtSearch from '~/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
import Hworld from '~/cts/book/c04-orm-model/db/vuex-orm/helloworld.js'
import HworldCh7 from '~/cts/book/c07-element-orm-connect-many-rows/db/vuex-orm/helloworld.js'
import HworldCh10 from '~/cts/book/c10-system-versioned-vl-data/db/vuex-orm/helloworld.js'
import CtLifeCycle from '@/cts/core/ctMaster/orm-ct-life-cycle'
import Rem from '~/cts/spi/1t-Mr1f/rem/db/vuex-orm/rem.js'
import ormName from '~/cts/spi/1t-1rMf/name/db/orm-name.js'
import ormWeight from '~/cts/spi/1t-1rMf/weight/db/orm-weight.js'
import ormHeight from '~/cts/spi/1t-1rMf/height/db/orm-height.js'
import ormTemperature from '~/cts/spi/1t-1rMf/temperature/db/orm-temperature.js'
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
database.register(ormTemperature)
database.register(Rex)
database.register(Dx)
database.register(Goal)
database.register(Scr)
database.register(CtLifeCycle)
database.register(Dxa)

export default database
