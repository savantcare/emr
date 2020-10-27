<template>
  <ctEditStructure :propFormDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components/temporal/1-framework/edit-layer/edit-form.vue'
import clientTblOfMasterServiceStatements from '../db/client-side/structure/service-statements-master.js'
import serviceStatementClientTbl from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
import { serviceStatementsFormDef } from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: serviceStatementsFormDef,
    }
  },
  props: {
    firstProp: {
      type: Number,
    },
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this

    this.formDef.fnGetSelectOptions = function (fieldNameInDb) {
      console.log('===== fn', fieldNameInDb)
      let arOfObjectsFromClientMasterDB = clientTblOfMasterServiceStatements
        .query()
        .where('ROW_END', 2147483648000)
        .where('serviceStatementFieldNameInDb', fieldNameInDb)
        .get()

      // get the value for this field in patient table
      const row = serviceStatementClientTbl.find(1)
      console.log(row[fieldNameInDb])

      arOfObjectsFromClientMasterDB.forEach(function (data) {
        data['id'] = data['serviceStatementFieldOptionId']
        data['value'] = data['serviceStatementFieldOptionLabel']
        data['selected'] = true
      })
      console.log(arOfObjectsFromClientMasterDB)

      return arOfObjectsFromClientMasterDB
    }
  },

  components: {
    ctEditStructure,
  },
}
</script>
