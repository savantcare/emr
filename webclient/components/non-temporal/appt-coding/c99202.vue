<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
      ><span :class="status ? '' : 'cross'">
        99202
        <transition name="fade">
          <span style="color: green; font-weight: bold" v-if="status">&check; </span>
        </transition>
      </span>
      <br />
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
