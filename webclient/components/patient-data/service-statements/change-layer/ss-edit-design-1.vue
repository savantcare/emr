<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/note-change/templates/edit-form.vue'
import { serviceStatementsFormDef } from '@/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: serviceStatementsFormDef,
    }
  },
  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  created() {},

  components: {
    ctEditFormTemplate,
  },
}
</script>
