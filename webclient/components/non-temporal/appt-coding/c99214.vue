<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><div :style="status ? '' : 'text-decoration: line-through red'">
        99214<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </div>

      <div :style="statusC1 ? '' : 'text-decoration: line-through red'">
        1. Billing duration > 15 and less then 26
        <span style="color: green; font-weight: bold" v-if="statusC1">&check;</span>
      </div>
      <span :class="statusC2 ? '' : 'strike'">
        2. Medical appt
        <transition name="fade">
          <span v-if="statusC2" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <div :style="statusC3 ? '' : 'text-decoration: line-through red'">
        3. Medical review of systems: 2 to 9
        <span style="color: green; font-weight: bold" v-if="statusC3">&check;</span>
      </div>
      <span :class="statusC4 ? '' : 'strike'">
        4. Mental status exam: > 8 elements
        <transition name="fade">
          <span v-if="statusC4" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC5 ? '' : 'strike'">
        5. This is followup appt
        <transition name="fade">
          <span v-if="statusC5" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <div :style="statusC6 ? '' : 'text-decoration: line-through red'">
        6. At least one of past psych, social or family history
        <span style="color: green; font-weight: bold" v-if="statusC6">&check;</span>
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
      return this.features.billingDuration > 15 && this.features.billingDuration < 26
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.elementsOfPsychReviewOfSystems > 1 && this.features.elementsOfPsychReviewOfSystems < 10
    },
    statusC4() {
      return this.features.mentalStatusExam > 8
    },
    statusC5() {
      return !this.features.itIsIntakeAppt
    },
    statusC6() {
      return this.features.pphx || this.features.shx || this.features.fhx
    },
    status() {
      return this.statusC1 && this.statusC2 && this.statusC3 && this.statusC4 && this.statusC5 && this.statusC6
    },
  },
}
</script>
