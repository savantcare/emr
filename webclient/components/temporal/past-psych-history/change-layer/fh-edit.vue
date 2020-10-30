<template>
  <ctEditStructure :propFormDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//framework/change/edit-form.vue'
import { pastPsychHistoryFormDef } from '@/components/temporal/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: pastPsychHistoryFormDef,
    }
  },
  props: {
    firstProp: {
      type: Number,
    },
  },
  mounted() {},

  components: {
    ctEditStructure,
  },
}
</script>
