<template>
  <!--  Prop explanation:
          v-on:mouseleave="mouseleave"
          Goal: Make it very easy to switch between the 3 modes 1. Dashboard 2. Work product mode 3. Analysis mode
          When the user takes the mouse to the left edge of the browser then bring the feed up
          Why not put it inside <SplitArea> the event does not get fired.
          Why not put a div inside and then put mouseleave event over there?
            when go from Layer1LeftSide to layer1RightSide the event gets fired.
        Ref: https://codepen.io/intotheprogram/pen/ZjxZdg 
    -->
  <div>
    <ctToGiveQuickAccessToFeatures></ctToGiveQuickAccessToFeatures>
    <ctToGiveProductTour></ctToGiveProductTour>
    <!-- Prop explanation:
        :gutterSize="0"
          This is thickness of the line between left and right panels. This line is used to adjust size of left and right
      -->
    <!-- 1440 / 900 is the default resolution for a macbook air. This app is being developed for macbook air -->
    <Split style="height: 900px; width: 1440px" :gutter-size="4">
      <SplitArea :size="cfLayer1LeftSideSplitSize">
        <ctLayer1LeftSideCards></ctLayer1LeftSideCards>
      </SplitArea>
      <SplitArea id="layer1RightSide" :size="cfLayer1RightSideSplitSize">
        <ctLayer1RightSideCards></ctLayer1RightSideCards>
      </SplitArea>
    </Split>
    <!-- tab-dialog is present in patientFile.vue but in hidden state -->
    <ctTabsInDialogInCL></ctTabsInDialogInCL>
    <ctLeftScreenExtensionDrawer></ctLeftScreenExtensionDrawer>
    <ctRightScreenExtensionDrawer></ctRightScreenExtensionDrawer>
    <ctMapDrawer></ctMapDrawer>
    <ctDeletedDrawer></ctDeletedDrawer>
    <ctFeed></ctFeed>
  </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@voerro/vue-tagsinput@2.4.0/dist/style.css';
</style>

<script>
import Vue from 'vue'
/* The folloiwng line makes $tours available to each component
Ref: https://vuejs.org/v2/cookbook/adding-instance-properties.html#Base-Example
This is needed by vue toue to work
*/
Vue.prototype.$tours = {}

/* External Cts */

import ctVlSearchBox from '@/components/non-temporal/search-phrases/call-init-of-components-and-handle-search-selection.vue'

/* 1/4 Why needed? Split Layer1LeftSide and layer1RightSide  */
import VueSplit from 'vue-split-panel'

/*  2/4 Why needed?
  Say the user enter the rex command 10 times. I need to scroll to the bottom of the cards
  So search box is given a ID and then #manage-layer1-right-side-cards is used to scroll down.
  */
import VueScrollTo from 'vue-scrollto' // Ref: https://github.com/rigor789/vue-scrollto#as-a-vue-directive

/* 3/4 Why needed?
   Used to toggle between Health and Other components.
   Why not use element.io inbuilt switch?
   Read: src/components/non-temporal/display-manager/TheLeftSideDisplayAreaHeader.vue:48
*/
import ToggleButton from 'vue-js-toggle-button' // Ref: http://vue-js-toggle-button.yev.io/

/* 4/4 Why use a different slider instead of slider from elemenet.io?
    Read: src/components/non-temporal/display-manager/TheLeftSideDisplayAreaHeader.vue:23
*/
import VueSlider from 'vue-slider-component' // Ref: github.com/NightCatSama/vue-slider-component
import 'vue-slider-component/theme/default.css'

// Ref: https://github.com/MetinSeylan/Vue-Socket.io#-installation
import VueSocketIO from 'vue-socket.io'

// Ref: https://github.com/voerro/vue-tagsinput
import VoerroTagsInput from '@voerro/vue-tagsinput'

Vue.component('tags-input', VoerroTagsInput)

// Internal Cts
import ctFeed from '@/components/non-temporal/feed/drawer.vue'
import ctLayer1LeftSideCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/dynamic-list-of-cards.vue'
import ctLayer1RightSideCards from '@/components/non-temporal/components-container-in-rhs-of-layer1/dynamic-list-of-cards.vue'
import ctTabsInDialogInCL from '@/components/non-temporal/components-container-in-edit-layer/show-add-and-remove-tabs-in-dialog-ct' // Name expands to Component tabs in dialog in change layer
import ctLeftScreenExtensionDrawer from '@/components/non-temporal/components-container-in-lhs-screen-extension/left-drawer.vue'
import ctRightScreenExtensionDrawer from '@/components/non-temporal/components-container-in-rhs-screen-extension/right-drawer.vue'
import ctMapDrawer from '@/components/non-temporal/map/drawer.vue'
import ctDeletedDrawer from '@/components/non-temporal/ct-deleted-rows/drawer.vue'
import clientSideTableOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import ctToGiveQuickAccessToFeatures from '~/components/non-temporal/quick-access-to-features/index.vue'

import ctToGiveProductTour from '~/components/non-temporal/product-tour/index.vue'

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
    ctLayer1LeftSideCards,
    ctLayer1RightSideCards,
    ctTabsInDialogInCL,
    ctLeftScreenExtensionDrawer,
    ctRightScreenExtensionDrawer,
    ctMapDrawer,
    ctDeletedDrawer,
    ctVlSearchBox,
    ctToGiveQuickAccessToFeatures,
    ctFeed,
    ctToGiveProductTour,
  },
  data() {
    return {}
  },
  mounted() {
    // when page first loads the change layer tabs are set to not show
    this.$store.commit('mtfSetTabDialogVisibility', false)
    this.mfUpdateSocketClientId()
  },

  computed: {
    cfLayer1LeftSideSplitSize() {
      const splitSize = clientSideTableOfCommonForAllComponents.find('layer1-left-side-split-size')
      if (splitSize) {
        return parseInt(splitSize['fieldValue'])
      }
      return 50
    },
    cfLayer1RightSideSplitSize() {
      const splitSize = clientSideTableOfCommonForAllComponents.find('layer1-right-side-split-size')
      if (splitSize) {
        return parseInt(splitSize['fieldValue'])
      }
      return 50
    },
  },
  methods: {
    mfUpdateSocketClientId() {
      console.log('Socker ID is', this.$socket.id)

      clientSideTableOfCommonForAllComponents.insert({
        data: {
          fieldName:
            'client-side-socketId-to-prevent-duplicate-UI-change-on-client-that-requested-server-for-data-change',
          fieldValue: this.$socket.id,
        },
      })

      console.log(clientSideTableOfCommonForAllComponents)
    },
    log(message) {
      console.log(message)
    },
  },
}
</script>
