<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/note-change/templates/edit-form.vue'
import { bloodPressureFormDef } from '@/components/patient-data/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bloodPressureFormDef,
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
    ctEditFormTemplate,
  },
}
</script>
