<template>
  <div>
    <el-card :style="{ 'background-color': bgColor }"
      >90837

      <div :style="{ 'text-decoration': textDecoration }">Billing duration > 52</div>
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
        console.log('returbubg line-thriugh')
        return 'line-through'
      }
    },
    status() {
      if (this.features.billingDuration > 52) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
