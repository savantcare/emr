<template>
  <fieldMultiValuesAdd :propCtDef="ctDef" :firstProp="firstProp"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/1-framework/edit-layer/edit-design-1.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.diagnosisCtDef,
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

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
