<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/note-change/templates/edit-form.vue'
import { temperatureFormDef } from '@/components/patient-data/temperature/db/client-side/structure/temperature-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: temperatureFormDef,
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
