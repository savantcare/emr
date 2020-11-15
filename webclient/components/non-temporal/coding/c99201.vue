<template>
  <div>
    <el-card
      ><div :style="status ? '' : 'text-decoration: line-through dotted red'">
        99201<span v-if="status">&check;</span>
      </div>
      <div :style="statusC1 ? '' : 'text-decoration: line-through dotted red'">1. Never used</div>
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
      return false
    },
    status() {
      return false
    },
  },
}
</script>
