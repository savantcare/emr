<template>
  <ctAddStructure :propCtDef="ctDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-form.vue'
import clientTblOfMasterServiceStatements from '../db/client-side/structure/service-statements-master.js'

export default {
  data: function () {
    return {
      ctDef: process.env.serviceStatementsCtDef,
    }
  },
  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this

    this.ctDef.fnGetSelectOptions = function (fieldNameInDb) {
      console.log('===== inside fn')
      let arOfObjectsFromClientMasterDB = clientTblOfMasterServiceStatements
        .query()
        .with('tblLinkToServiceStatementForPatientFieldValues')
        .where('ROW_END', 2147483648000)
        .where('serviceStatementFieldNameInDb', fieldNameInDb)
        .get()

      arOfObjectsFromClientMasterDB.forEach(function (data) {
        data['id'] = data['serviceStatementFieldOptionId']
        data['value'] = data['serviceStatementFieldOptionLabel']
      })
      console.log(arOfObjectsFromClientMasterDB)

      return arOfObjectsFromClientMasterDB
    }
  },

  components: {
    ctAddStructure,
  },
}
</script>
