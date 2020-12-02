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
    <el-input v-model="searchTerm" placeholder="Please input"></el-input>
  </el-dialog>
</template>

<script>
import commonForAllCts from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {
      searchTerm: '',
    }
  },
  components: {},
  watch: {},
  computed: {
    cfDrawerVisibility() {
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
  methods: {
    handleClose(done) {
      commonForAllCts.insertOrUpdate({
        data: [{ fieldName: 'one-search-box', fieldValue: 'false' }],
      })
    },
  },
}
</script>

<style></style>
