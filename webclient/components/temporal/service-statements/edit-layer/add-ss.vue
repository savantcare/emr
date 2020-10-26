<template>
  <ctAddStructure :propCtDef="ctDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-structure.vue'
import clientTblOfPatientServiceStatements from '../db/client-side/structure/service-statements-of-a-patient-table.js'
import clientTblOfMasterServiceStatements from '../db/client-side/structure/service-statements-master.js'

export default {
  data: function () {
    return {
      ctDef: process.env.serviceStatementsCtDef,
    }
  },
  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this

    this.ctDef.fields[0].selectOptions = function (fieldObj) {
      console.log('===== inside fn')
      let arOfObjectsFromClientMasterDB = clientTblOfMasterServiceStatements
        .query()
        .with('tblLinkToServiceStatementForPatientFieldValues')
        .where('ROW_END', 2147483648000)
        .get()

      arOfObjectsFromClientMasterDB.forEach(function (data) {
        data['id'] = data['serviceStatementFieldMasterId']
        data['value'] = data['serviceStatementFieldDescription']
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
