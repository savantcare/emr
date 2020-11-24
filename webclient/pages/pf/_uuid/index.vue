<template>
  <!--  Prop explanation:
          v-on:mouseleave="mouseleave"
          GOAL: Make it very easy to switch between the 3 modes 1. Dashboard 2. Work product mode 3. Analysis mode
          When the user takes the mouse to the left edge of the browser then bring the feed up
          Why not put it inside <SplitArea> the event does not get fired.
          Why not put a div inside and then put mouseleave event over there?
            when go from Layer1LeftSide to layer1RightSide the event gets fired.
        Ref: https://codepen.io/intotheprogram/pen/ZjxZdg 
    -->
  <div :style="cfSendFontSizeCustomizedByUserInPercentageToHtml">
    <!-- GOAL1: Initialize the keyboard and mouse controls -->
    <ctToGiveQuickAccessToFeatures></ctToGiveQuickAccessToFeatures>

    <!-- GOAL2: Initialize the tutorial to teach user the fundamentals of the software -->
    <ctToGiveProductTour></ctToGiveProductTour>

    <!-- GOAL3: Open the default cards on left side and right side -->
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
        <!-- Right screen extension is not a drawer. Since split size cannot be used when it is a
        drawer. When there is a veritical bar that can be moved around but the drawer does not response. It becomes very confusing
        for the user-->
        <div v-if="cfRightScreenExtensionVisibility"><ctRightScreenExtensionDrawer /></div>
        <div v-else>
          <ctLayer1RightSideCards></ctLayer1RightSideCards>
        </div>
      </SplitArea>
    </Split>

    <!-- GOAL4: Init component to show tabs in edit layer -->
    <ctTabsInDialogInCL></ctTabsInDialogInCL>

    <!-- GOAL5: Init component to show components in left extension -->
    <ctLeftScreenExtensionDrawer></ctLeftScreenExtensionDrawer>
    <ctChangeInTabs />

    <!-- GOAL7: Init drawer component -->
    <!--    <ctMapDrawer></ctMapDrawer> -->

    <!-- GOAL8: Init -->
    <ctDeletedDrawer></ctDeletedDrawer>

    <!-- GOAL9: Init -->
    <ctFeed></ctFeed>

    <!-- GOAL10: Init -->
    <ctInitOfComponents></ctInitOfComponents>
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

import ctVlSearchBox from '@/components/non-temporal/search-phrases/show-auto-complete-search-box-and-handle-search-selection.vue'

/* 1/4 Why needed? Split Layer1LeftSide and layer1RightSide  */
import VueSplit from 'vue-split-panel'

/*  2/4 Why needed?
  Say the user enter the rex command 10 times. I need to scroll to the bottom of the cards
  So search box is given a ID and then #manage-layer1-right-side-cards is used to scroll down.
  */
import VueScrollTo from 'vue-scrollto' // Ref: https://github.com/rigor789/vue-scrollto#as-a-vue-directive

/* 3/4 Why needed?
   Used to toggle between Health and Other components.
   Why not use element.io inbuilt switch? In elementio inbuilt switch I can not put H and O insid e the swutch itself.
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

// Ref: https://github.com/voerro/vue-tagsinput. This is used on top of the correlate graph inside the header
import VoerroTagsInput from '@voerro/vue-tagsinput'
Vue.component('tags-input', VoerroTagsInput)

// Internal Cts
import ctFeed from '@/components/non-temporal/feed/drawer.vue'
import ctLayer1LeftSideCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/dynamic-list-of-cards.vue'
import ctLayer1RightSideCards from '@/components/non-temporal/components-container-in-rhs-of-layer1/dynamic-list-of-cards.vue'
import ctTabsInDialogInCL from '@/components/non-temporal/components-container-in-change-layer/show-add-and-remove-tabs-in-dialog-ct' // Name expands to Component tabs in dialog in change layer
import ctLeftScreenExtensionDrawer from '@/components/non-temporal/components-container-in-lhs-screen-extension/left-drawer.vue'
import ctChangeInTabs from '@/components/non-temporal/vertical-tabs-for-change/show-in-dialog.vue'
import ctRightScreenExtensionDrawer from '@/components/non-temporal/components-container-in-rhs-screen-extension/right-drawer.vue'
import ctMapDrawer from '@/components/non-temporal/map/drawer.vue'
import ctDeletedDrawer from '@/components/non-temporal/ct-deleted-rows/drawer.vue'
import clientSideTableOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import ctToGiveQuickAccessToFeatures from '~/components/non-temporal/quick-access-to-features/index.vue'

import ctToGiveProductTour from '~/components/non-temporal/product-tour/index.vue'
import ctInitOfComponents from './central-file-to-initialize-of-components.vue'

// Ref: https://github.com/MetinSeylan/Vue-Socket.io#-installation
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:6001',
  })
)

// Ref: https://vuelidate.js.org/#sub-installation
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

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
    ctInitOfComponents,
    ctChangeInTabs,
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

    cfRightScreenExtensionVisibility() {
      const drawerVisibility = clientSideTableOfCommonForAllComponents.find('right-screen-extension-drawer-visibility')

      if (drawerVisibility) {
        if (drawerVisibility['fieldValue'] == 'true') {
          return true
        }
      }

      return false
    },

    cfSendFontSizeCustomizedByUserInPercentageToHtml() {
      var font_size_of_root = '100%'
      const font_size_customized_by_user_in_percentage = clientSideTableOfCommonForAllComponents.find(
        'font-size-customized-by-user-value-in-percentage'
      )

      if (font_size_customized_by_user_in_percentage) {
        font_size_of_root = font_size_customized_by_user_in_percentage['fieldValue'] + '%'
      }

      /**
       * Ref: https://stackoverflow.com/questions/48172814/how-to-compute-styles-on-body-or-html-using-vue-js
       */

      document.querySelector('html').style.fontSize = font_size_of_root
    },
  },
  methods: {
    mfUpdateSocketClientId() {
      clientSideTableOfCommonForAllComponents.insert({
        data: {
          fieldName:
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change',
          fieldValue: this.$socket.id,
        },
      })
    },
    log(message) {
      console.log(message)
    },
  },
}
</script>

<style>
/**
  :root font-size css was conflicting with html font-size percentage css.

  I have removed the following css
*/
/* :root {
  font-size: var(--font-size-of-root) !important;
} */

/*
Some font-size css was coming from element-io library file 
- /gt/emr/webclient/node_modules/element-ui/lib/theme-chalk/index.css

I have write the below css to overright the default font-size given in library file 

convert pixel to rem:
Ref: https://www.ninjaunits.com/converters/pixels/pixels-rem/
*/
.el-tabs__item,
.el-input,
input,
button {
  font-size: 0.875rem;
}
.el-collapse-item__header,
.el-collapse-item__content {
  font-size: 0.8125rem;
}

/**
I have added the following css because if we set font-size=200% then v-tour popup width becomes bigger than page width
*/
.v-tour .el-card__body {
  max-width: 600px;
}
</style>
