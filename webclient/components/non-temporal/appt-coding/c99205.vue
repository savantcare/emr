<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><div :style="status ? '' : 'text-decoration: line-through red'">
        99205<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </div>

      <div :style="statusC1 ? '' : 'text-decoration: line-through red'">
        1. Billing duration >= 60 <span style="color: green; font-weight: bold" v-if="statusC1">&check;</span>
      </div>
      <div :style="statusC2 ? '' : 'text-decoration: line-through red'">
        2. Medical appt <span style="color: green; font-weight: bold" v-if="statusC2">&check;</span>
      </div>
      <div :style="statusC3 ? '' : 'text-decoration: line-through red'">
        3. Medical review of systems: Complete
        <span style="color: green; font-weight: bold" v-if="statusC3">&check;</span>
      </div>
      <div :style="statusC4 ? '' : 'text-decoration: line-through red'">
        4. Vitals: Complete <span style="color: green; font-weight: bold" v-if="statusC4">&check;</span>
      </div>
      <div :style="statusC5 ? '' : 'text-decoration: line-through red'">
        5. Mental status exam: Complete <span style="color: green; font-weight: bold" v-if="statusC5">&check;</span>
      </div>

      <span :class="statusC6 ? '' : 'strike'">
        6. This is intake appt
        <transition name="fade">
          <span v-if="statusC6" style="color: green; font-weight: bold"> &check;</span></transition
        >
      </span>
      <br />
      <span :class="statusC7 ? '' : 'strike'"
        >7. At least 2 out of 3 history (psych, social, family)

        <transition name="fade">
          <span style="color: green; font-weight: bold" v-if="statusC7">&check;</span>
        </transition>
      </span>
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
      return this.features.billingDuration >= 60
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.elementsOfPsychReviewOfSystems > 14
    },
    statusC4() {
      return this.features.vitals === true
    },
    statusC5() {
      return this.features.mentalStatusExam === 15
    },
    statusC6() {
      return this.features.itIsIntakeAppt === true
    },
    statusC7() {
      const count = this.features.pphx + this.features.shx + this.features.fhx
      return count > 1
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
