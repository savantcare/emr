<template>
  <div>
    <el-card :style="{ 'background-color': bgColor }"
      >90832

      <div :style="{ 'text-decoration': textDecoration }">Billing duration > 15 and less then 37</div>
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
    textDecoration() {
      if (this.status) {
        return ''
      } else {
        return 'line-through'
      }
    },
    status() {
      if (this.features.billingDuration > 15 && this.features.billingDuration < 38) {
      } else {
        return false
      }

      if (this.features.isItTherapyOnlyAppt !== true) {
        return false
      }

      return true
    },
  },
}
</script>
