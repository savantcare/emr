<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'">
      <span :class="status ? '' : 'cross'">
        99215
        <transition name="fade">
          <span style="color: green; font-weight: bold" v-if="status">&check; </span>
        </transition>
      </span>
      <br />
      <span :class="statusC1 ? '' : 'strike'">
        1. Billing duration > 24 and less then 41
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
        3. Medical review of systems: 10+
        <transition name="fade">
          <span v-if="statusC3" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC4 ? '' : 'strike'">
        4. Vitals: Complete
        <transition name="fade">
          <span v-if="statusC4" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC5 ? '' : 'strike'">
        5. Mental status exam: Complete
        <transition name="fade">
          <span v-if="statusC5" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC6 ? '' : 'strike'">
        6. This is followup appt
        <transition name="fade">
          <span v-if="statusC6" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC7 ? '' : 'strike'">
        7. At least 2 out of 3 history (psych, social, family)
        <transition name="fade">
          <span v-if="statusC7" style="color: green; font-weight: bold"> &check;</span></transition
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
      return this.features.billingDuration > 24 && this.features.billingDuration < 41
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.elementsOfPsychReviewOfSystems > 9
    },
    statusC4() {
      return this.features.vitals === true
    },
    statusC5() {
      return this.features.mentalStatusExam === 15
    },
    statusC6() {
      return this.features.itIsIntakeAppt === false
    },
    statusC7() {
      return this.features.pphx + this.features.shx + this.features.fhx > 1
    },
    status() {
      return (
        this.statusC1 &&
        this.statusC2 &&
        this.statusC3 &&
        this.statusC4 &&
        this.statusC5 &&
        this.statusC6 &&
        this.statusC7
      )
    },
  },
}
</script>
