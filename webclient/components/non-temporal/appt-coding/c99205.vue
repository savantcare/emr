<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><span :class="statusC1 ? '' : 'cross'">
        99205<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </span>
      <br />

      <div style="text-align: center">
        <span :class="statusC1 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          1. Billing duration >= 60
          <transition name="fade">
            <span v-if="statusC1" style="color: green; font-weight: bold"> &check;</span></transition
          >
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC2 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          2. Medical appt
          <transition name="fade">
            <span v-if="statusC2" style="color: green; font-weight: bold"> &check;</span></transition
          >
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC3 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          3. Medical review of systems: Complete
          <transition name="fade">
            <span v-if="statusC3" style="color: green; font-weight: bold"> &check;</span></transition
          >
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC4 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          4. Vitals: Complete
          <transition name="fade">
            <span v-if="statusC4" style="color: green; font-weight: bold"> &check;</span></transition
          >
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC5 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          5. Mental status exam: Complete
          <transition name="fade">
            <span v-if="statusC5" style="color: green; font-weight: bold"> &check;</span></transition
          >
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC6 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          6. This is intake appt
          <transition name="fade">
            <span v-if="statusC6" style="color: green; font-weight: bold"> &check;</span></transition
          >
        </span>
      </div>
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
