// Reference implementation
import orm from '~/cts/spi/1t-1rMf/name/db/orm-name.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      /* 
        1. TODO: Load based on patient uuid in the URL
        2. For this PtUuid the # of records returned will be:
            0 if no name was ever entered for this patient
            1 if name was entered but never changed
            more then 1 if name was entered and then changed
      */

      const pro = await orm.api().get(orm.apiUrl + '/1')
      if (pro.ok) {
      }
    },
  },
}
