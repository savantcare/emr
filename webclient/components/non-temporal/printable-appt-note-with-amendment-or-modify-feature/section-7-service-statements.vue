<template>
  <div>
    <printNote :propApptId="propApptId" :propCtDef="ctDef"></printNote>
  </div>
</template>

<script>
import printNote from './structure-print-note.vue'
import clientTblOfMasterServiceStatements from '~/components/temporal/service-statements/db/client-side/structure/service-statements-master.js'

export default {
  components: {
    printNote,
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      ctDef: process.env.serviceStatementsCtDef,
    }
  },
  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this

    this.ctDef.fnGetSelectOptionLabel = function (pFieldNameInDb, pfieldValue) {
      if (pfieldValue === '') return

      // from numbers get the labels

      this.ctDef.fnGetSelectOptions = function (fieldNameInDb) {
        console.log('===== inside fn')
        let arOfObjectsFromClientMasterDB = clientTblOfMasterServiceStatements
          .query()
          .where('serviceStatementFieldNameInDb', pFieldNameInDb)
          .where('serviceStatementFieldOptionId', pfieldValue)
          .get()

        console.log(arOfObjectsFromClientMasterDB)

        return arOfObjectsFromClientMasterDB['serviceStatementFieldOptionLabel']
      }
    }
  },
}
</script>
