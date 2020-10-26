<template>
  <ctEditStructure :propCtDef="ctDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components/temporal/1-framework/edit-layer/edit-structure.vue'
import clientTblOfMasterServiceStatements from '../db/client-side/structure/service-statements-master.js'

export default {
  data: function () {
    return {
      ctDef: process.env.serviceStatementsCtDef,
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
    ctEditStructure,
  },
}
</script>
