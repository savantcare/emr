// Master doc is at reference implementation rem/db/full-sync-with-server-db-mixin.js.
// This file has doc unique to this ct Code synced with ref implementation on 18th sept 2020
import objOrmMaster from '~/components/pt-info/single/1t-Mrow-1Field/scr/db/vuex-orm/scr-table-master.js'
import objOrm from '~/components/pt-info/single/1t-Mrow-1Field/scr/db/vuex-orm/scr-table.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // api is vuex-orm-axios plugin function
      const ptUUID = 'bfe041fa-073b-4223-8c69-0540ee678ff8'
      const proScrsFromDB = await objOrm.api().get(objOrm.apiUrl + '' + ptUUID)
      // console.log('===========', proScrsFromDB)
      if (proScrsFromDB.isSaved) {
        /**
         * Q) Why updating objOrm for screening with master data
         *
         * Ans) The masterData is not fetched from db and it is stored in the objOrmMaster via scr/static-data/scr-master-data.js file
         * to fetch the screening scrName, scientificName etc. we traversed with  objOrmMaster data to get the related fields.
         */
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
