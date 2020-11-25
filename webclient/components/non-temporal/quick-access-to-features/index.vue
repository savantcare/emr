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
    <div v-shortkey="['f10']" @shortkey="actOnF10ShortKeyPressed()"></div>
    <!-- End of defining short cut keys -->

    <!-- Goal: Open different "patient data sections" in the change layer with KB shortcuts-->
    <div v-shortkey.once="['ctrl', 'c']" @shortkey="actOnUserIntentToSeeChiefComplaint()"></div>
    <div v-shortkey.once="['ctrl', 'h']" @shortkey="actOnUserIntentToSeeHPI()"></div>
    <div v-shortkey.once="['ctrl', 's']" @shortkey="actOnUserIntentToSeeSS()"></div>
  </div>
</template>

<script>
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.$root.$on('from-product-tour-start-work-product-mode', (pRowId) => {
      this.goToWorkProductMode()
    })

    this.$root.$on('from-product-tour-start-dashboard-mode', (pRowId) => {
      this.goToDashboardMode()
    })

    this.$root.$on('from-product-tour-start-analysis-mode', (pRowId) => {
      this.goToAnalysisMode()
    })
  },
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
    actOnF10ShortKeyPressed() {
      this.toggleBetweenHealthAndOtherComponents()
    },
    actOnUserIntentToSeeChiefComplaint() {
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: 'chief_complaint' }],
      })
    },
    actOnUserIntentToSeeHPI() {
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: 'psych_review_of_system' }],
      })
    },
    actOnUserIntentToSeeSS() {
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: 'service_statements' }],
      })
    },
    goToDashboardMode() {
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'right-screen-extension-drawer-visibility', fieldValue: false }],
      })

      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'left-screen-extension-drawer-visibility', fieldValue: false }],
      })

      // set the split dimensions

      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-left-side-split-size', fieldValue: 50 }],
      })

      clientTblOfCommonForAllComponents.insertOrUpdate({
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
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'right-screen-extension-drawer-visibility', fieldValue: true }],
      })

      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'left-screen-extension-drawer-visibility', fieldValue: false }],
      })

      // set the split dimensions

      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-left-side-split-size', fieldValue: 50 }],
      })

      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-right-side-split-size', fieldValue: 50 }],
      })
      this.$notify.success({
        message: 'Editing assesment and plan',
        position: 'top-left',
        duration: 1000,
        showClose: false,
        type: 'success',
      })
    },

    goToAnalysisMode() {
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'right-screen-extension-drawer-visibility', fieldValue: false }],
      })

      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'left-screen-extension-drawer-visibility', fieldValue: true }],
      })

      // set the split dimensions
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-left-side-split-size', fieldValue: 50 }],
      })

      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-right-side-split-size', fieldValue: 50 }],
      })
      this.$notify.success({
        message: 'Editing history and exam',
        position: 'top-right',
        duration: 1000,
        showClose: false,
        type: 'success',
      })
    },
    toggleBetweenHealthAndOtherComponents() {
      // Goal: Decide if I need to do update or insert
      const arOfObjectsFromCommonForAllComponents = clientTblOfCommonForAllComponents.find(
        'classification-of-component-to-show-on-left-hand-side'
      )

      if (arOfObjectsFromCommonForAllComponents) {
        if (arOfObjectsFromCommonForAllComponents['fieldValue'] == 'health') {
          clientTblOfCommonForAllComponents.insertOrUpdate({
            data: [
              {
                fieldName: 'classification-of-component-to-show-on-left-hand-side',
                fieldValue: 'other',
              },
            ],
          })
        } else {
          clientTblOfCommonForAllComponents.insertOrUpdate({
            data: [
              {
                fieldName: 'classification-of-component-to-show-on-left-hand-side',
                fieldValue: 'health',
              },
            ],
          })
        }
      } else {
        clientTblOfCommonForAllComponents.insertOrUpdate({
          data: [
            {
              fieldName: 'classification-of-component-to-show-on-left-hand-side',
              fieldValue: 'other',
            },
          ],
        })
      }
    },
  },
}
</script>
