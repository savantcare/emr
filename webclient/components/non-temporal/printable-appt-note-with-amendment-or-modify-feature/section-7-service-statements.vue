<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="formDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/framework/view/paper.vue'
import clientTblOfMasterServiceStatements from '~/components/temporal/service-statements/db/client-side/structure/service-statements-master.js'
import { serviceStatementsFormDef } from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

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
      formDef: serviceStatementsFormDef,
    }
  },
  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this

    this.formDef.fnGetSelectOptionLabel = function (pFieldNameInDb, pfieldValue) {
      if (pfieldValue === '') return

      // from numbers get the labels

      let arOfObjectsFromClientMasterDB = clientTblOfMasterServiceStatements
        .query()
        .where('serviceStatementFieldNameInDb', pFieldNameInDb)
        .where('serviceStatementFieldOptionId', pfieldValue)
        .get()

      const optionIdToLabel = arOfObjectsFromClientMasterDB[0]['serviceStatementFieldOptionLabel']

      return optionIdToLabel
    }
  },
}
</script>
