<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><div :style="status ? '' : 'text-decoration: line-through red'">
        99201<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </div>
      <div :style="statusC1 ? '' : 'text-decoration: line-through red'">1. Never used</div>
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
