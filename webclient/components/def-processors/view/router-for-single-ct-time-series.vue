<template>
  <div>
    <paperNote :propApptId="propApptId" :propFormDef="formDef" :arrowDirection="arrowDirection"></paperNote>
  </div>
</template>

<script>
import paperNote from '@/components/def-processors/view/time-series-of-a-single-ct.vue'
import allFormDefinations from '@/components//def-processors/all-form-definations.js'

export default {
  components: {
    paperNote,
  },
  props: {
    propApptId: {
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
