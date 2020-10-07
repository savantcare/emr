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
    return {
      dLayer1LeftSideSplitSize: 50,
      dLayer1RightSideSplitSize: 50,
    }
  },
  computed: {
    layer1LeftSideSplitSize() {
      return this.dLayer1LeftSideSplitSize
    },
    layer1RightSideSplitSize() {
      return this.dLayer1RightSideSplitSize
    },
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
      console.log('shortkey')
      this.goToDashboardMode()
    },
    actOnF2ShortKeyPressed() {
      console.log('shortkey')
      this.goToWorkProductMode()
    },
    actOnF3ShortKeyPressed() {
      console.log('shortkey')
      this.goToAnalysisMode()
    },

    goToDashboardMode() {
      const obj = clientSideTableOfCommonForAllComponents
        .query()
        .where('fieldName', 'setRightScreenExtensionDrawerVisibility')
        .get()

      console.log(obj)

      // This will take care of 3 scenarios. If true will make false. If false will update to false. If not exit then fail siliently
      if (obj[0]) {
        if (obj[0]['fieldValue'] === 'true') {
          clientSideTableOfCommonForAllComponents.update({
            where: (record) => record.fieldName === 'setRightScreenExtensionDrawerVisibility',
            data: {
              fieldValue: false,
            },
          })
        }
      }
      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      this.$store.commit('mtfSetFeedDrawerVisibility', false)

      this.dLayer1LeftSideSplitSize = 50
      this.dLayer1RightSideSplitSize = 50
    },

    goToWorkProductMode() {
      const obj = clientSideTableOfCommonForAllComponents
        .query()
        .where('fieldName', 'setRightScreenExtensionDrawerVisibility')
        .get()

      console.log(obj)

      // This will take care of 3 scenarios. If true will make true. If false will update to true. If not exit then fail siliently
      if (obj[0]) {
        if (obj[0]['fieldValue'] === 'false') {
          clientSideTableOfCommonForAllComponents.update({
            where: (record) => record.fieldName === 'setRightScreenExtensionDrawerVisibility',
            data: {
              fieldValue: true,
            },
          })
        }
      } else {
        clientSideTableOfCommonForAllComponents.insert({
          data: {
            fieldName: 'setRightScreenExtensionDrawerVisibility',
            fieldValue: true,
          },
        })
      }

      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      this.$store.commit('mtfSetFeedDrawerVisibility', false)

      this.dLayer1LeftSideSplitSize = 65
      this.dLayer1RightSideSplitSize = 35
    },

    goToAnalysisMode() {
      const obj = clientSideTableOfCommonForAllComponents
        .query()
        .where('fieldName', 'setRightScreenExtensionDrawerVisibility')
        .get()

      console.log(obj)

      // This will take care of 3 scenarios. If true will make true. If false will update to true. If not exit then fail siliently
      if (obj[0]) {
        if (obj[0]['fieldValue'] === 'true') {
          clientSideTableOfCommonForAllComponents.update({
            where: (record) => record.fieldName === 'setRightScreenExtensionDrawerVisibility',
            data: {
              fieldValue: false,
            },
          })
        }
      }

      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      this.$store.commit('mtfSetFeedDrawerVisibility', true)
      this.dLayer1LeftSideSplitSize = 35
      this.dLayer1RightSideSplitSize = 65
    },

    toggleLeftSideScreenExtensionDrawer() {
      this.$store.commit('mtfSetFeedDrawerVisibility', true)
    },
    toggleRightSideScreenExtensionDrawer() {
      // Open right screen extension drawer
      if (
        clientSideTableOfCommonForAllComponents
          .query()
          .where('fieldName', 'setRightScreenExtensionDrawerVisibility')
          .count()
      ) {
        const obj = clientSideTableOfCommonForAllComponents
          .query()
          .where('fieldName', 'setRightScreenExtensionDrawerVisibility')
          .get()

        console.log(obj)

        if (obj[0]['fieldValue'] === 'true') {
          clientSideTableOfCommonForAllComponents.update({
            where: (record) => record.fieldName === 'setRightScreenExtensionDrawerVisibility',
            data: {
              fieldValue: false,
            },
          })
        } else {
          clientSideTableOfCommonForAllComponents.update({
            where: (record) => record.fieldName === 'setRightScreenExtensionDrawerVisibility',
            data: {
              fieldValue: true,
            },
          })
        }
      } else {
        clientSideTableOfCommonForAllComponents.insert({
          data: {
            fieldName: 'setRightScreenExtensionDrawerVisibility',
            fieldValue: true,
          },
        })
      }
    },
  },
}
</script>
