<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'">
      <div :style="status ? '' : 'text-decoration: line-through red'">
        90837<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </div>
      <span :class="statusC1 ? '' : 'strike'">
        1. Billing duration > 52
        <transition name="fade">
          <span v-if="statusC1" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC2 ? '' : 'strike'">
        2. Therapy only appt
        <transition name="fade">
          <span v-if="statusC2" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />
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
