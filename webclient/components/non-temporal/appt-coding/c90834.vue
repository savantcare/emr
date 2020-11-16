<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><span :class="status ? '' : 'cross'">
        90834
        <transition name="fade">
          <span style="color: green; font-weight: bold" v-if="status">&check; </span>
        </transition>
      </span>
      <br />

      <div style="text-align: center">
        <span :class="statusC1 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          2. Billing duration > 37 and less then 53
          <transition name="fade">
            <span v-if="statusC1" style="color: green; font-weight: bold"> &check;</span></transition
          >
        </span>
      </div>

      <div style="text-align: center">
        <span :class="statusC2 ? '' : 'strike'" style="border-style: dashed; border-width: 1px">
          1. Therapy only appt
          <transition name="fade">
            <span v-if="statusC2" style="color: green; font-weight: bold"> &check;</span></transition
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
    statusC1() {
      return this.features.billingDuration > 37 && this.features.billingDuration < 53
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt === true
    },
    status() {
      return this.statusC1 && this.statusC2
    },
  },
}
</script>
