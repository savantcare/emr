<template>
  <div>
    <el-card :style="status ? '' : 'background-color:#C0C4CC'"
      ><div :style="{ 'text-decoration': textDecorationMain }">90832<span v-if="status">&check;</span></div>

      <div :style="{ 'text-decoration': textDecorationC1 }">
        1. Billing duration > 15 and less then 37 <span v-if="statusC1">&check;</span>
      </div>
      <div :style="{ 'text-decoration': textDecorationC2 }">
        2. Therapy only appt <span v-if="statusC2">&check;</span>
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
  data: function () {
    return {}
  },
  computed: {
    bgColor() {
      if (this.status) {
        return ''
      } else {
        return '#C0C4CC'
      }
    },
    textDecorationMain() {
      if (this.status) {
        return ''
      } else {
        return 'line-through dotted red'
      }
    },
    textDecorationC1() {
      if (this.statusC1) {
        return ''
      } else {
        return 'line-through dotted red'
      }
    },
    textDecorationC2() {
      if (this.statusC2) {
        return ''
      } else {
        return 'line-through dotted red'
      }
    },
    statusC1() {
      if (this.features.billingDuration > 15 && this.features.billingDuration < 38) {
        return true
      } else {
        return false
      }
    },
    statusC2() {
      if (this.features.isItTherapyOnlyAppt === true) {
        return true
      } else {
        return false
      }
    },
    status() {
      return this.statusC1 && this.statusC2
    },
  },
}
</script>
