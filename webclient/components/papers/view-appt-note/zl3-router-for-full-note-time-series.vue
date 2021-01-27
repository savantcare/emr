<template>
  <div>
    <contentDuringApptOfASingleCt
      :_apptId="_apptId"
      :_formDef="formDef"
      :arrowDirection="arrowDirection"
    ></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/papers/view-appt-note/templates/zl4-content-during-appt-of-a-single-ct.vue'
import allFormDefs from '@/components//non-temporal/form-manager/all-form-definations.js'

export default {
  components: {
    contentDuringApptOfASingleCt,
  },
  props: {
    _apptId: {
      type: Number,
      required: true,
    },
    arrowDirection: {
      type: Number,
    },
    _entity: {
      type: String,
    },
  },
  data: function () {
    return {
      formDef: {},
    }
  },
  created() {
    this.formDef = allFormDefs[this._entity]
  },
}
</script>
