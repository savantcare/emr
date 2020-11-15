<template>
  <div>
    <el-card :style="{ 'background-color': bgColor }"
      >90832

      <div :style="{ 'text-decoration': textDecorationC1 }">Billing duration > 15 and less then 37</div>
      <div :style="{ 'text-decoration': textDecorationC2 }">Therapy only appt</div>
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
    textDecorationC1() {
      if (this.statusC1) {
        return ''
      } else {
        return 'line-through'
      }
    },
    textDecorationC2() {
      if (this.statusC2) {
        return ''
      } else {
        return 'line-through'
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
