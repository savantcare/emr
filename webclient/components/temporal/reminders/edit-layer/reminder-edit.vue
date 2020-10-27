<template>
  <ctEditStructure :propFormDef="ctDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components/temporal/1-framework/edit-layer/edit-form.vue'

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
    ctEditStructure,
  },
}
</script>
