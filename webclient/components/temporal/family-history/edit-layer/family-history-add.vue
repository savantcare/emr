<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//framework/change/add-form.vue'
import { familyHistoryFormDef } from '@/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: familyHistoryFormDef,
    }
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    ctAddStructure,
  },
}
</script>
