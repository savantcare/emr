<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'">
      <span :class="status ? '' : 'cross'">
        99204
        <transition name="fade">
          <span style="color: green; font-weight: bold" v-if="status">&check;</span>
        </transition>
      </span>
      <br />

      <div style="text-align: center">
        <span :class="statusC3 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          6. Medical review of systems: Complete
          <transition name="fade">
            <span v-if="statusC3" style="color: green; font-weight: bold">&check;</span>
          </transition>
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC6 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          5. At least 2 out of 3 history (psych, social, family)
          <transition name="fade">
            <span v-if="statusC6" style="color: green; font-weight: bold">&check;</span>
          </transition>
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC4 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          4. Examination: Complete
          <transition name="fade">
            <span v-if="statusC4" style="color: green; font-weight: bold">&check;</span>
          </transition>
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC1 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          3. Billing duration >= 45
          <transition name="fade">
            <span v-if="statusC1" style="color: green; font-weight: bold">&check;</span>
          </transition>
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC5 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          2. This is intake appt
          <transition name="fade">
            <span v-if="statusC5" style="color: green; font-weight: bold">&check;</span>
          </transition>
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC2 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          1. Medical appt
          <transition name="fade">
            <span v-if="statusC2" style="color: green; font-weight: bold">&check;</span>
          </transition>
        </span>
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
      return this.features.billingDuration >= 45
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.elementsOfPsychReviewOfSystems > 14
    },
    statusC4() {
      return this.features.examination === 15
    },
    statusC5() {
      return this.features.itIsIntakeAppt === true
    },
    statusC6() {
      return this.features.pphx + this.features.shx + this.features.fhx > 1
    },
    status() {
      return this.statusC1 && this.statusC2 && this.statusC3 && this.statusC4 && this.statusC5 && this.statusC6
    },
  },
}
</script>
