<template>
  <div>
    <el-card :style="{ 'background-color': bgColor }"
      >90834

      <div :style="{ 'text-decoration': textDecoration }">Billing duration > 36</div>
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
        return 'grey'
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
      if (this.features.billingDuration > 38) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
