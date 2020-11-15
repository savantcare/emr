<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><span :class="status ? '' : 'cross'">
        99203
        <transition name="fade">
          <span style="color: green; font-weight: bold" v-if="status">&check; </span>
        </transition>
      </span>
      <br />

      <span :class="statusC1 ? '' : 'strike'">
        1. Billing duration >= 30
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
        3. Medical review of systems: 2 to 9
        <transition name="fade">
          <span v-if="statusC3" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC4 ? '' : 'strike'">
        4. This is intake appt
        <transition name="fade">
          <span v-if="statusC4" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />

      <span :class="statusC5 ? '' : 'strike'">
        5. At least 2 out of 3 history (psych, social, family)
        <transition name="fade">
          <span v-if="statusC5" style="color: green; font-weight: bold"> &check;</span></transition
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
      return this.features.billingDuration >= 30
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.elementsOfPsychReviewOfSystems > 1 && this.features.elementsOfPsychReviewOfSystems < 10
    },
    statusC4() {
      return this.features.itIsIntakeAppt === true
    },
    statusC5() {
      return this.features.pphx + this.features.shx + this.features.fhx > 1
    },
    status() {
      return this.statusC1 && this.statusC2 && this.statusC3 && this.statusC4 && this.statusC5
    },
  },
}
</script>
