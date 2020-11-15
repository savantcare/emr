<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'">
      <span :class="status ? '' : 'cross'">
        99212
        <transition name="fade">
          <span style="color: green; font-weight: bold" v-if="status">&check; </span>
        </transition>
      </span>

      <div style="text-align: center">
        <span :class="statusC3 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          3. Billing duration: Greater then 9 min
          <transition name="fade">
            <span v-if="statusC3" style="color: green; font-weight: bold"> &check;</span></transition
          >
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC2 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          2. This is followup appt
          <transition name="fade">
            <span v-if="statusC2" style="color: green; font-weight: bold"> &check;</span></transition
          >
        </span>
      </div>
      <div style="text-align: center">
        <span :class="statusC1 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          1. Medical appt
          <transition name="fade">
            <span v-if="statusC1" style="color: green; font-weight: bold"> &check;</span></transition
          >
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
