<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//framework/change/add-form.vue'
import clientTblOfMasterServiceStatements from '../db/client-side/structure/service-statements-master.js'
import { serviceStatementsFormDef } from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: serviceStatementsFormDef,
    }
  },
  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this

    this.formDef.fnGetSelectOptions = function (fieldNameInDb) {
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
