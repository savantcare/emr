<template>
  <ctEditStructure :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//papers/note-change/templates/edit-form.vue'
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
    ctEditStructure,
  },
}
</script>
