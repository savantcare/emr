<template>
  <fieldMultiValuesEdit :propCtDef="ctDef" :firstProp="firstProp"></fieldMultiValuesEdit>
</template>

<script>
import fieldMultiValuesEdit from '@/components/temporal/1-framework/edit-layer/edit-structure.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.remindersCtDef,
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
