<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/note-change/templates/edit-form.vue'
import { pastPsychHistoryFormDef } from '@/components/patient-data/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: pastPsychHistoryFormDef,
    }
  },
  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },
  mounted() {},

  components: {
    ctEditFormTemplate,
  },
}
</script>
