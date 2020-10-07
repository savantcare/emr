<!-- Params
      Goal: Do not show the shadow so doctor can read the view layer.
            modal=false means -> Do now show shadowing layer
  -->
<template>
  <el-drawer
    title="Analysis"
    :visible="cfDrawerVisibility"
    direction="rtl"
    :before-close="handleClose"
    :modal="false"
    :close-on-press-escape="true"
    :show-close="true"
    :wrapperClosable="false"
  >
    <div class="block">
      <ctSearchBoxInsideRightScreenExtension></ctSearchBoxInsideRightScreenExtension>
    </div>
  </el-drawer>
</template>

<script>
import tableStructureForStoreMessageFromOtherComponent from '~/components/ptinfo-combined/right-screen-extension/db/client-side/structure/store-messages-from-other-components.js'
import ctSearchBoxInsideRightScreenExtension from '@/components/core/search-phrases/call-insert-search-phases-of-components-and-handle-selection.vue'
import clientSideTableOfCommonForAllComponents from '@/components/ptinfo-single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {
      direction: 'ltr',
    }
  },
  components: {
    ctSearchBoxInsideRightScreenExtension,
  },
  computed: {
    cfDrawerVisibility() {
      const arOfObjectsFromCommonForAllComponents = clientSideTableOfCommonForAllComponents
        .query()
        .where('fieldName', 'setRightScreenExtensionDrawerVisibility')
        .get()

      if (arOfObjectsFromCommonForAllComponents.length > 0) {
        if (arOfObjectsFromCommonForAllComponents[0]['fieldValue'] === 'true') {
          return true
        } else {
          return false
        }
      }
    },
  },
  mounted() {
    // console.log('Drawer ct mounted')
  },
  methods: {
    handleClose(done) {
      clientSideTableOfCommonForAllComponents.update({
        where: (record) => record.fieldName === 'setRightScreenExtensionDrawerVisibility',
        data: {
          fieldValue: false,
        },
      })
    },
  },
}
</script>
