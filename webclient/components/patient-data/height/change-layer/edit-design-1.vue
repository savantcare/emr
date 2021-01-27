<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { heightFormDef } from '@/components/patient-data/height/db/client-side/structure/height-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: heightFormDef,
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
