<template>
  <div>
    <contentDuringApptOfASingleCt
      :_ApptId="_ApptId"
      :_formDef="formDef"
      :arrowDirection="arrowDirection"
    ></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import allFormDefinations from '@/components//def-processors/all-form-definations.js'

export default {
  components: {
    contentDuringApptOfASingleCt,
  },
  props: {
    _ApptId: {
      type: Number,
      required: true,
    },
    arrowDirection: {
      type: Number,
    },
    propEntity: {
      type: String,
    },
  },
  data: function () {
    return {
      formDef: {},
    }
  },
  created() {
    this.formDef = allFormDefinations[this.propEntity]
  },
}
</script>
