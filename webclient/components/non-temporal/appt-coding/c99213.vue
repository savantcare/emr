<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><div :style="status ? '' : 'text-decoration: line-through red'">
        99213<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </div>

      <div :style="statusC1 ? '' : 'text-decoration: line-through red'">
        1. Billing duration greater then 14 mins
        <span style="color: green; font-weight: bold" v-if="statusC1">&check;</span>
      </div>
      <div :style="statusC2 ? '' : 'text-decoration: line-through red'">
        2. Medical appt <span style="color: green; font-weight: bold" v-if="statusC2">&check;</span>
      </div>
      <div :style="statusC3 ? '' : 'text-decoration: line-through red'">
        3. Mental status exam: > 5 elements <span style="color: green; font-weight: bold" v-if="statusC3">&check;</span>
      </div>
      <div :style="statusC4 ? '' : 'text-decoration: line-through red'">
        4. This is followup appt <span style="color: green; font-weight: bold" v-if="statusC4">&check;</span>
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
