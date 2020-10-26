<template>
  <fieldMultiValuesAdd :propCtDef="ctDef"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/1-framework/edit-layer/add-structure.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.familyHistoryCtDef,
    }
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
