<template>
  <ctAddStructure :propCtDef="ctDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-structure.vue'
import serviceStatementClientTbl from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

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
      const arOfObjectsFromClientDB = serviceStatementClientTbl
        .query()
        .where('ROW_END', 2147483648000) // if unlocked then only current rows should be shown
        .get()
      if (arOfObjectsFromClientDB.length === 0) {
        console.log('Length 0')
        const options = fieldObj.options
        console.log('inside the fn to return select options')
        return options
      } else {
        console.log('Length > 0')
      }
    }
    console.log(this.ctDef)
  },

  components: {
    ctAddStructure,
  },
}
</script>
