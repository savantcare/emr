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
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import allFormDefs from '@/components//def-processors/all-form-definations.js'

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
