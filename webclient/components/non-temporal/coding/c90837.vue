<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'">
      <div :style="status ? '' : 'text-decoration: line-through dotted red'">
        90837<span v-if="status">&check;</span>
      </div>
      <div :style="statusC1 ? '' : 'text-decoration: line-through dotted red'">
        1. Billing duration > 52 <span v-if="statusC1">&check;</span>
      </div>
      <div :style="statusC2 ? '' : 'text-decoration: line-through dotted red'">
        2. Therapy only appt <span v-if="statusC2">&check;</span>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    features: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statusC1() {
      return this.features.billingDuration > 52
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt === true
    },
    status() {
      return this.statusC1 && this.statusC2
    },
  },
}
</script>
