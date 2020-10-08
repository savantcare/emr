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
    <VTour
      name="myTour"
      :steps="steps"
      :options="{ highlight: true }"
      :callbacks="myCallbacks"
    ></VTour>

    <ctToGiveQuickAccessToFeatures></ctToGiveQuickAccessToFeatures>
    <!-- Prop explanation:
        :gutterSize="0"
          This is thickness of the line between left and right panels. This line is used to adjust size of left and right
      -->
    <Split style="height: 900px; width: 1400px" :gutter-size="4">
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

/* External Cts */

import ctVlSearchBox from '@/components/others/search-phrases/call-init-of-components-and-handle-search-selection.vue'

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

/* Ref: https://github.com/pulsardev/vue-tour
Why download the source code and then run it?
I wanted to use element.io UI and that was not possible with a npm package.
v-tour has slots that allow some customization. But it was not possible to bring the complete look of element.ui
*/
import VTour from '@/components/others/external/vue-tour/components/vTour.vue'
import VStep from '@/components/others/external/vue-tour/components/VStep.vue'
// The folloiwng line makes $tours available to each component
Vue.prototype.$tours = {}

// Internal Cts
import ctFeed from '@/components/ptinfo-combined/feed/drawer.vue'
import ctLayer1LeftSideCards from '@/components/others/components-container-in-lhs-of-layer1/dynamic-list-of-cards.vue'
import ctLayer1RightSideCards from '@/components/others/components-container-in-rhs-of-layer1/dynamic-list-of-cards.vue'
import ctTabsInDialogInCL from '@/components/others/components-container-in-edit-layer/show-add-and-remove-tabs-in-dialog-ct' // Name expands to Component tabs in dialog in change layer
import ctLeftScreenExtensionDrawer from '@/components/others/components-container-in-lhs-screen-extension/left-drawer.vue'
import ctRightScreenExtensionDrawer from '@/components/others/components-container-in-rhs-screen-extension/right-drawer.vue'
import ctMapDrawer from '@/components/ptinfo-combined/map/drawer.vue'
import ctDeletedDrawer from '@/components/others/ct-deleted-rows/drawer.vue'
import clientSideTableOfCommonForAllComponents from '~/components/ptinfo-single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'
import ctToGiveQuickAccessToFeatures from '~/components/others/quick-access-to-features/index.vue'

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
    VTour,
    VStep,
  },
  data() {
    return {
      myCallbacks: {
        onPreviousStep: this.myCustomPreviousStepCallback,
        onNextStep: this.myCustomNextStepCallback,
      },
      steps: [
        {
          target: '[data-v-step="appt-timeline"]',
          content:
            'This is the appointment timeline. Use this to compare notes between appointment ',

          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false, // Ref: https://github.com/pulsardev/vue-tour/wiki/Features#disable-scroll-between-steps
          },
        },
        {
          target: '.el-icon-setting',
          content: 'Use this to decide which notes show up in the timeline',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F1 gets you the dashboard</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },

        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F2 gets you work product mode</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F3 gets you analysis mode</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F4 Compares current note with previous note</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F5 Is the quickest way to add a task</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F6 Is the quickest way to add a medication order</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F7 Is the quickest way to add a reminder</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F8 Is the quickest way to add a recommendation</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',

          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F9 Is the quickest way to do MSE</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F10 totoggle between health and other components</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
      ],
    }
  },
  mounted() {
    // this initialized the vuetour. The $tours is abailable to all Cts as it has been added as Vue.prototype.$tours = {} see line 82
    this.$tours['myTour'].start()

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
    myCustomPreviousStepCallback(currentStep) {
      console.log('prev step called')
      if (currentStep === 2) {
        console.log('[Vue Tour] Go to work product mode')
        this.$root.$emit('from-product-tour-start-work-product-mode')
      }
      if (currentStep === 3) {
        console.log('[Vue Tour] Go to analysis mode')
        this.$root.$emit('from-product-tour-start-analysis-mode')
      }
    },
    myCustomNextStepCallback(currentStep) {
      console.log('next step called')
      if (currentStep === 2) {
        console.log('[Vue Tour] Go to work product mode')
        this.$root.$emit('from-product-tour-start-work-product-mode')
      }
      if (currentStep === 3) {
        console.log('[Vue Tour] Go to analysis mode')
        this.$root.$emit('from-product-tour-start-analysis-mode')
      }
    },
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
  },
}
</script>

<style>
/**
  I have added the following css to display tour guide div on the top most layer
*/
body .v-tour > div {
  z-index: 2014;
}
</style>
