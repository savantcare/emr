<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><div :style="status ? '' : 'text-decoration: line-through red'">
        99213<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </div>

      <span :class="statusC1 ? '' : 'strike'">
        1. Billing duration greater then 14 mins
        <transition name="fade">
          <span v-if="statusC1" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC2 ? '' : 'strike'">
        2. Medical appt
        <transition name="fade">
          <span v-if="statusC2" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC3 ? '' : 'strike'">
        3. Mental status exam: > 5 elements
        <transition name="fade">
          <span v-if="statusC3" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC4 ? '' : 'strike'">
        4. This is followup appt
        <transition name="fade">
          <span v-if="statusC4" style="color: green; font-weight: bold"> &check;</span></transition
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
      return this.features.billingDuration > 14
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.mentalStatusExam > 5
    },
    statusC4() {
      return this.features.itIsIntakeAppt !== true
    },
    status() {
      return this.statusC1 && this.statusC2 && this.statusC3 && this.statusC4
    },
  },
}
</script>
