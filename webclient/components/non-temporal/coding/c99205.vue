<template>
  <div>
    <el-card :style="{ 'background-color': bgColor }"
      >99205

      <div :style="{ 'text-decoration': textDecoration }">Billing duration = 60</div>
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
      if (this.features.billingDuration === 60) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
