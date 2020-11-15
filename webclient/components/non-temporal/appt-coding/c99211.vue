<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><div :style="status ? '' : 'text-decoration: line-through red'">
        99211<span style="color: green; font-weight: bold" v-if="status">&check;</span>
      </div>
      <span :class="statusC1 ? '' : 'strike'"> 1. Never used </span>
      <br />
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
