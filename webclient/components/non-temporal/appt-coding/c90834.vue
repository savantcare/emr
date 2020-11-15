<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><div :style="status ? '' : 'text-decoration: line-through red'">
        90834<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </div>

      <div :style="statusC1 ? '' : 'text-decoration: line-through red'">
        1. Billing duration > 37 and less then 53
        <span style="color: green; font-weight: bold" v-if="statusC1">&check;</span>
      </div>
      <div :style="statusC2 ? '' : 'text-decoration: line-through red'">
        2. Therapy only appt <span style="color: green; font-weight: bold" v-if="statusC2">&check;</span>
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
