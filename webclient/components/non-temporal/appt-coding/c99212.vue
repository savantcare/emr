<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'">
      <div style="display: grid; grid-template-columns: 1ft; align-items: start">
        <div style="border-style: dashed; border-width: 1px">
          <span :class="status ? '' : 'cross'">
            99212
            <transition name="fade">
              <span style="color: green; font-weight: bold" v-if="status">&check; </span>
            </transition>
          </span>
        </div>

        <div style="border-style: dashed; border-width: 1px">
          <span :class="statusC3 ? '' : 'strike'">
            3. Billing duration: Greater then 9 min
            <transition name="fade">
              <span v-if="statusC3" style="color: green; font-weight: bold"> &check;</span></transition
            >
          </span>
        </div>

        <div style="border-style: dashed; border-width: 1px">
          <span :class="statusC2 ? '' : 'strike'">
            2. This is followup appt
            <transition name="fade">
              <span v-if="statusC2" style="color: green; font-weight: bold"> &check;</span></transition
            >
          </span>
        </div>
        <div style="border-style: dashed; border-width: 1px">
          <span :class="statusC1 ? '' : 'strike'">
            1. Medical appt
            <transition name="fade">
              <span v-if="statusC1" style="color: green; font-weight: bold"> &check;</span></transition
            >
          </span>
        </div>
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
    statusC3() {
      return this.features.billingDuration > 9
    },
    statusC1() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC2() {
      return this.features.itIsIntakeAppt !== true
    },
    status() {
      return this.statusC1 && this.statusC2 && this.statusC3
    },
  },
}
</script>
