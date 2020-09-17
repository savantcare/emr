// Master doc is at reference implementation rem/db/full-sync-with-server-db-mixin.js.
//  This file has doc unique to this ct Code synced with ref implementation on 17th sept 2020
import objOrmMaster from '~/cts/spi/1t-Mrow-1Field/scr/db/vuex-orm/orm-scr-master-list.js'
import objOrm from '~/cts/spi/1t-Mrow-1Field/scr/db/vuex-orm/orm-scr-of-pt.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // api is vuex-orm-axios plugin function
      const ptUUID = 'bfe041fa-073b-4223-8c69-0540ee678ff8'
      const proScrsFromDB = await objOrm.api().get(objOrm.apiUrl + '' + ptUUID)
      if (proScrsFromDB.isSaved) {
        const ormScrMasterData = objOrmMaster.all()
        const ormScrData = objOrm.all()
        const ormScrDataCount = ormScrData.length
        if (ormScrDataCount > 0) {
          for (let i = 0; i < ormScrDataCount; i++) {
            // update record with master data
            const objScrMaster = ormScrMasterData.find(
              (x) => x.uuid === parseInt(ormScrData[i].scrUUID)
            )
            // console.log(ormScrData[i], obj)
            await objOrm.update({
              where: (record) => record.id === ormScrData[i].id,
              data: {
                scrName: objScrMaster.scrName,
                scientificName: objScrMaster.scientificName,
                clinicalStudies: objScrMaster.clinicalStudies,
              },
            })
          }
        }
      }
    },
  },
}
