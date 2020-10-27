<template>
  <ctAddStructure :propFormDef="formDef" :firstProp="firstProp"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/edit-form.vue'

export default {
  data: function () {
    return {
      formDef: process.env.diagnosisFormDef,
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
    ctAddStructure,
  },
}
</script>
