<template>
  <ctEditStructure :_formDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//papers/note-change/templates/edit-form.vue'
import { medicalHistoryFormDef } from '@/components/patient-data/medication-order/db/client-side/structure/medication-order-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: medicalHistoryFormDef,
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
