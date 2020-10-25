<template>
  <fieldMultiValuesEdit :propCtDef="ctDef" :firstProp="firstProp"></fieldMultiValuesEdit>
</template>

<script>
import fieldMultiValuesEdit from '@/components/temporal/1-framework/edit-layer/edit-design-1.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.recommendationsCtDef,
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
    fieldMultiValuesEdit,
  },
}
</script>
