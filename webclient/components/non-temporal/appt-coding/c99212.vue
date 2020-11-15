<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><span :class="status ? '' : 'cross'">
        99212
        <transition name="fade">
          <span style="color: green; font-weight: bold" v-if="status">&check; </span>
        </transition>
      </span>
      <br />

      <span :class="statusC1 ? '' : 'strike'">
        1. Billing duration: Greater then 9 min
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
        3. This is followup appt
        <transition name="fade">
          <span v-if="statusC3" style="color: green; font-weight: bold"> &check;</span></transition
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
      return this.features.billingDuration > 9
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.itIsIntakeAppt !== true
    },
    status() {
      return this.statusC1 && this.statusC2 && this.statusC3
    },
  },
}
</script>
