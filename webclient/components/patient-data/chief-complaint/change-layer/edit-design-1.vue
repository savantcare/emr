<template>
  <div
    v-if="_rowIdForEdit"
    why="This is inside v-if so the component does not get called if the rowId has not been fetched yet."
  >
    <ctEditStructure :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditStructure>
  </div>
</template>

<script>
import ctEditStructure from '@/components//papers/note-change/templates/edit-form.vue'
import { chiefComplaintFormDef } from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import chiefComplainTbl from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: chiefComplaintFormDef,
      rowId: null,
    }
  },
  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },
  mounted() {
    //debugger
  },

  components: {
    ctEditStructure,
  },
}
</script>
