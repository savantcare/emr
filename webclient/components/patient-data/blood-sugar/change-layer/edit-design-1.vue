<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/note-change/templates/edit-form.vue'
import { bloodSugarFormDef } from '@/components/patient-data/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bloodSugarFormDef,
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
