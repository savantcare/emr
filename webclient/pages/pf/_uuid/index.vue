<template>
  <!--  Prop explanation:
          v-on:mouseleave="mouseleave"
          Goal: Make it very easy to get the feed
          When the user takes the mouse to the left edge of the browser then bring the feed up
          Why not put it inside <SplitArea> the event does not get fired.
          Why not put a div inside and then put mouseleave event over there?
            when go from mtsvl to ptsvl the event gets fired.
        Ref: https://codepen.io/intotheprogram/pen/ZjxZdg 
    -->
  <div @mouseleave="mouseleave" v-shortkey="['f1']" @shortkey="actOnF1ShortKeyPressed()">
    <!-- Prop explanation:
        :gutterSize="0"
          This is thickness of the line between left and right panels. This line is used to adjust size of left and right
      -->
    <Split style="height: 900px; width: 1400px" :gutter-size="4">
      <SplitArea :size="leftSplitSize">
        <ctMtsVlCards></ctMtsVlCards>
      </SplitArea>
      <SplitArea id="ptsvl" :size="rightSplitSize">
        <ctCsVlCards></ctCsVlCards>
      </SplitArea>
    </Split>
    <!-- tab-dialog is present in patientFile.vue but in hidden state -->
    <ctTabsInDialogInCL></ctTabsInDialogInCL>
    <ctLeftScreenExtensionDrawer
      v-shortkey="['f2']"
      @shortkey.native="actOnF2ShortKeyPressed()"
    ></ctLeftScreenExtensionDrawer>
    <ctRightScreenExtensionDrawer
      v-shortkey="['f3']"
      @shortkey.native="actOnF3ShortKeyPressed()"
    ></ctRightScreenExtensionDrawer>
    <ctMapDrawer></ctMapDrawer>
    <ctDeletedDrawer></ctDeletedDrawer>
  </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@voerro/vue-tagsinput@2.4.0/dist/style.css';
</style>

<script>
import Vue from 'vue'

/* External Cts */

import ctVlSearchBox from '@/components/others/search-phrases/call-insert-search-phases-of-components-and-handle-selection.vue'

/* 1/4 Why needed? Split mtsvl and ptsvl  */
import VueSplit from 'vue-split-panel'

/*  2/4 Why needed?
  Say the user enter the rex command 10 times. I need to scroll to the bottom of the cards
  So search box is given a ID and then #manage-ptsvl-cards is used to scroll down.
  */
import VueScrollTo from 'vue-scrollto' // Ref: https://github.com/rigor789/vue-scrollto#as-a-vue-directive

/* 3/4 Why needed?
   Used to toggle between Health and Other components.
   Why not use element.io inbuilt switch?
   Read: src/components/common/TheMultiStateDisplayAreaHeader.vue:48
*/
import ToggleButton from 'vue-js-toggle-button' // Ref: http://vue-js-toggle-button.yev.io/

/* 4/4 Why use a different slider instead of slider from elemenet.io?
    Read: src/components/common/TheMultiStateDisplayAreaHeader.vue:23
*/
import VueSlider from 'vue-slider-component' // Ref: github.com/NightCatSama/vue-slider-component
import 'vue-slider-component/theme/default.css'

// Ref: https://github.com/MetinSeylan/Vue-Socket.io#-installation
import VueSocketIO from 'vue-socket.io'

// Ref: https://github.com/voerro/vue-tagsinput
import VoerroTagsInput from '@voerro/vue-tagsinput'

Vue.component('tags-input', VoerroTagsInput)

// Internal Cts
import ctMtsVlCards from '@/components/others/layer-1-left-side-components/dynamic-list-of-cards.vue'
import ctCsVlCards from '@/components/others/layer-1-right-side-components/dynamic-list-of-cards.vue'
import ctTabsInDialogInCL from '@/components/others/edit-layer-tabs/show-add-and-remove-tabs-in-dialog-ct' // Name expands to Component tabs in dialog in change layer
import ctLeftScreenExtensionDrawer from '@/components/others/left-screen-extension/left-drawer.vue'
import ctRightScreenExtensionDrawer from '@/components/others/right-screen-extension/right-drawer.vue'
import ctMapDrawer from '@/components/ptinfo-combined/map/drawer.vue'
import ctDeletedDrawer from '@/components/others/ct-deleted-rows/drawer.vue'
import clientSideTableOfCommonForAllComponents from '~/components/ptinfo-single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

// Ref: https://github.com/MetinSeylan/Vue-Socket.io#-installation
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:6001',
  })
)

Vue.component('VueSlider', VueSlider)

Vue.use(VueSplit)
Vue.use(VueScrollTo)
Vue.use(ToggleButton)

export default {
  components: {
    ctMtsVlCards,
    ctCsVlCards,
    ctTabsInDialogInCL,
    ctLeftScreenExtensionDrawer,
    ctRightScreenExtensionDrawer,
    ctMapDrawer,
    ctDeletedDrawer,
    ctVlSearchBox,
  },
  data() {
    return {
      currentVisibilityStatusOfScBrainComponentContainingDialog: false,
      dLeftSplitSize: 50,
      dRightSplitSize: 50,
    }
  },
  mounted() {
    // when page first loads the change layer tabs are set to not show
    this.$store.commit('mtfSetTabDialogVisibility', false)
    this.mfUpdateSocketClientId()
  },

  computed: {
    leftSplitSize() {
      return this.dLeftSplitSize
    },
    rightSplitSize() {
      return this.dRightSplitSize
    },
  },
  methods: {
    mfUpdateSocketClientId() {
      console.log('Socker ID is', this.$socket.id)

      clientSideTableOfCommonForAllComponents.insert({
        data: {
          fieldName:
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange',
          fieldValue: this.$socket.id,
        },
      })

      console.log(clientSideTableOfCommonForAllComponents)
    },
    log(message) {
      console.log(message)
    },

    // Goal: Catch mouse events
    mouseleave(event) {
      // console.log('mouse leave', event)

      // How to identify which side the mouse left https://stackoverflow.com/a/48281888
      if (event.clientX <= 0) {
        // This is when the mouse leave from the left
        if (event.clientY <= 200) {
          // This is the top corner
          this.goToAnalysisMode()
        }
      } else if (event.clientX <= window.innerWidth) {
        if (event.clientY <= 200) {
          this.goToWorkProductMode()
        }
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

      this.dLeftSplitSize = 50
      this.dRightSplitSize = 50
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

      this.dLeftSplitSize = 65
      this.dRightSplitSize = 35
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
      this.dLeftSplitSize = 35
      this.dRightSplitSize = 65
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

<style>
body .el-drawer__wrapper {
  left: unset;
  width: 700px;
}
</style>
