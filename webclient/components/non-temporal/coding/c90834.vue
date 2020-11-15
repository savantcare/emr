<template>
  <div>
    <el-card>90834 {{ status }}</el-card>
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
    return {
      status: '',
    }
  },
  mounted() {
    if (this.features.billingDuration > 38) {
      this.status = 'possible'
    } else {
      this.status = 'not possible'
    }
  },
}
</script>
