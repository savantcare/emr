<template>
  <div>
    <el-card :style="{ 'background-color': bgColor }"
      >90834

      <div :style="{ 'text-decoration': textDecoration }">Billing duration > 37 and less then 53</div>
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
      if (this.features.billingDuration > 37 && this.features.billingDuration < 53) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
