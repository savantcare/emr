<template>
  <div
    v-if="_rowIdForEdit"
    why="This is inside v-if so the component does not get called if the rowId has not been fetched yet."
  >
    <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
  </div>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { examinationFormDef } from '@/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: examinationFormDef,
    }
  },
  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },

  mounted() {
    //   console.log(this._rowIdForEdit)
  },

  created() {},

  components: {
    ctEditFormTemplate,
  },
}
</script>
