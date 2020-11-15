<template>
  <div>
    <el-card :style="myStyle"
      >90834 {{ status }}

      <div style="text-decoration: line-through">Billing duration > 36</div>
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
    return {
      myStyle: 'background-color: grey; text-decoration: line-through',
    }
  },
  computed: {
    status() {
      if (this.features.billingDuration > 38) {
        return 'possible'
      } else {
        return 'not possible'
      }
    },
  },
}
</script>
