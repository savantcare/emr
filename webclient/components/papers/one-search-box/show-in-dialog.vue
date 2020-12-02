<template>
  <el-dialog
    custom-class="multi-tab-dialog"
    :modal="true"
    :close-on-click-modal="true"
    :before-close="handleClose"
    :close-on-press-escape="true"
    :show-close="false"
    :visible="cfDrawerVisibility"
    :lock-scroll="true"
    top="1vh"
    width="80%"
  >
    jai kali ma

    <el-input></el-input>
  </el-dialog>
</template>

<script>
import commonForAllCts from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {}
  },
  components: {},
  watch: {},
  computed: {
    cfDrawerVisibility() {
      debugger
      const drawerVisibility = commonForAllCts.find('one-search-box')

      if (drawerVisibility) {
        if (drawerVisibility['fieldValue'] !== 'false') {
          return true
        }
      }
      return false
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style></style>
