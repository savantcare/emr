<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><div :style="status ? '' : 'text-decoration: line-through red'">
        99203<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </div>

      <div :style="statusC1 ? '' : 'text-decoration: line-through red'">
        1. Billing duration >= 30 <span style="color: green; font-weight: bold" v-if="statusC1">&check;</span>
      </div>
      <div :style="statusC2 ? '' : 'text-decoration: line-through red'">
        2. Medical appt <span style="color: green; font-weight: bold" v-if="statusC2">&check;</span>
      </div>
      <div :style="statusC3 ? '' : 'text-decoration: line-through red'">
        3. Medical review of systems: 2 to 9
        <span style="color: green; font-weight: bold" v-if="statusC3">&check;</span>
      </div>
      <div :style="statusC4 ? '' : 'text-decoration: line-through red'">
        4. This is intake appt <span style="color: green; font-weight: bold" v-if="statusC4">&check;</span>
      </div>
      <div :style="statusC5 ? '' : 'text-decoration: line-through red'">
        5. At least 2 out of 3 history (psych, social, family)
        <span style="color: green; font-weight: bold" v-if="statusC5">&check;</span>
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
