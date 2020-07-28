// this is file 3 in example

import { Database } from '@vuex-orm/core'
import CtSearch from '~/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'
import CtLifeCycle from '@/cts/core/ctMaster/orm-ct-life-cycle'
import User from '@/models/user'
import Patient from '@/models/patient'
import Rex from '@/cts/spi/rec/vuex-orm/model.js'
import rowStatus from '@/cts/core/crud/rowstatus.js'
import Rem from '@/cts/spi/rem/db/vuex-orm/rem.js'
import Dx from '@/models/Dx'
import Goal from '@/models/Goal'
import Scr from '@/models/Screening'
import Dxa from '@/models/Dxa'
import Hworld from '~/cts/book/c4-orm-model/db/vuex-orm/helloworld.js'
import HworldCh7 from '~/cts/book/c7-multiple-data-rows/db/vuex-orm/helloworld.js'

const database = new Database()

database.register(User)
database.register(Patient)
database.register(Rex)
database.register(rowStatus)
database.register(Rem)
database.register(Dx)
database.register(Goal)
database.register(Scr)
database.register(CtSearch)
database.register(CtLifeCycle)
database.register(Dxa)
database.register(Hworld)
database.register(HworldCh7)

export default database
