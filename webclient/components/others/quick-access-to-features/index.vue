<template>
  <div>
    <!-- Goal: Implement "system preferences -> Mission control -> hot corners" concept of MacOS on the view area -->
    <span
      @mouseover="actOnMouseOverSpan('analysis')"
      style="position: absolute; width: 4px; height: 50px; background-color: blue"
    ></span>
    <span
      @mouseover="actOnMouseOverSpan('production')"
      style="position: absolute; width: 4px; height: 50px; background-color: green; right: 0"
    ></span>
    <!-- END of hot corner area defination -->

    <!-- Goal: Implement "system preferences -> Mission control -> Show desktop -> Function key assignment" concept of MacOS on the view area -->
    <div v-shortkey="['f1']" @shortkey="actOnF1ShortKeyPressed()"></div>
    <div v-shortkey="['f2']" @shortkey="actOnF2ShortKeyPressed()"></div>
    <div v-shortkey="['f3']" @shortkey="actOnF3ShortKeyPressed()"></div>
    <!-- End of defining short cut keys -->
  </div>
</template>

<script>
import clientSideTableOfCommonForAllComponents from '~/components/ptinfo-single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {}
  },
  computed: {},
  methods: {
    // Goal: Catch mouse events
    actOnMouseOverSpan(mode) {
      if (mode == 'analysis') {
        this.goToAnalysisMode()
      } else if (mode == 'production') {
        this.goToWorkProductMode()
      }
    },

    // Goal: Catch KB events
    actOnF1ShortKeyPressed() {
      this.goToDashboardMode()
    },
    actOnF2ShortKeyPressed() {
      this.goToWorkProductMode()
    },
    actOnF3ShortKeyPressed() {
      this.goToAnalysisMode()
    },

    goToDashboardMode() {
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'rightScreenExtensionDrawerVisibility', fieldValue: false }],
      })

      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'leftScreenExtensionDrawerVisibility', fieldValue: false }],
      })

      // set the split dimensions

      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-left-side-split-size', fieldValue: 50 }],
      })

      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-right-side-split-size', fieldValue: 50 }],
      })
      this.$notify.success({
        message: 'Welcome to dashboard',
        position: 'top-left',
        duration: 1000,
        showClose: false,
        type: 'success',
      })
    },

    goToWorkProductMode() {
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'rightScreenExtensionDrawerVisibility', fieldValue: true }],
      })

      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'leftScreenExtensionDrawerVisibility', fieldValue: false }],
      })

      // set the split dimensions

      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-left-side-split-size', fieldValue: 60 }],
      })

      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-right-side-split-size', fieldValue: 40 }],
      })
      this.$notify.success({
        message: 'Welcome to work product mode',
        position: 'top-left',
        duration: 1000,
        showClose: false,
        type: 'success',
      })
    },

    goToAnalysisMode() {
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'rightScreenExtensionDrawerVisibility', fieldValue: false }],
      })

      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'leftScreenExtensionDrawerVisibility', fieldValue: true }],
      })

      // set the split dimensions
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-left-side-split-size', fieldValue: 35 }],
      })

      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-right-side-split-size', fieldValue: 65 }],
      })
      this.$notify.success({
        message: 'Welcome to analysis mode',
        position: 'top-right',
        duration: 1000,
        showClose: false,
        type: 'success',
      })
    },
  },
}
</script>
