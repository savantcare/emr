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
  <div>
    <div v-if="!loggedInUuid" class="text-center">
      <a :href="baseUrlForP20"><h1>Please login</h1></a>
    </div>
    <div v-else :style="cfSendFontSizeCustomizedByUserInPercentageToHtml">
      <fullscreen class="wrapper" ref="fullscreen" @change="fullscreenChange" background="#EEE" :init="cfGetFullScreenMode">
        <!-- GOAL1: Initialize the keyboard and mouse controls -->
        <ctToGiveQuickAccessToFeatures></ctToGiveQuickAccessToFeatures>

        <!-- GOAL2: Initialize the tutorial to teach user the fundamentals of the software -->
        <ctToGiveProductTour></ctToGiveProductTour>

        <!-- Header start -->
        <el-row class="paper_view_top_header">
          <ctPaperViewTopHeaderComponents></ctPaperViewTopHeaderComponents>
        </el-row>
        <!-- Header end -->

        <!-- GOAL3: Open the default cards on left side and right side -->
        <!-- Prop explanation:
          :gutterSize="0"
            This is thickness of the line between left and right panels. This line is used to adjust size of left and right
      -->
        <!-- 1440 / 900 is the default resolution for a macbook air. This app is being developed for macbook air -->
        <Split style="height: 900px; width: 1440px" :gutter-size="4">
          <SplitArea :size="cfLayer1LeftSideSplitSize">
            <ctPaperViewNoteLeftSideComponents></ctPaperViewNoteLeftSideComponents>
          </SplitArea>
          <SplitArea id="layer1RightSide" :size="cfLayer1RightSideSplitSize">
            <!-- Right screen extension is not a drawer. Since split size cannot be used when it is a
          drawer. When there is a veritical bar that can be moved around but the drawer does not response. It becomes very confusing
          for the user-->
            <div v-if="cfRightScreenExtensionVisibility">
              <ctRightScreenExtensionDrawer />
            </div>
            <div v-else>
              <ctPaperViewNoteRightSideComponents></ctPaperViewNoteRightSideComponents>
            </div>
          </SplitArea>
        </Split>

        <!-- GOAL4: Init component to show tabs in edit layer -->
        <ctTabsInDialogInCL></ctTabsInDialogInCL>

        <!-- GOAL5: Init component to show components in left extension -->
        <ctLeftScreenExtensionDrawer></ctLeftScreenExtensionDrawer>
        <ctChangeInTabs />
        <ctOneSearchBox />
        <!-- GOAL7: Init drawer component -->
        <!--    <ctMapDrawer></ctMapDrawer> -->

        <!-- GOAL8: Init -->
        <ctDeletedDrawer></ctDeletedDrawer>

        <!-- GOAL9: Init -->
        <ctFeed></ctFeed>

        <!-- GOAL10: Init -->
        <ctInitOfComponents></ctInitOfComponents>

        <!--<div :class="[fullscreen ? 'full-screen-button-mode-on' : 'full-screen-button-mode-off']">
          <el-button round size="mini" class="btn-map-fullscreen" @click="toggleFullScreen" type="primary"
            ><i :class="[fullscreen ? 'el-icon-close' : 'el-icon-full-screen']"></i>
          </el-button>
        </div>-->
      </fullscreen>
    </div>
  </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@voerro/vue-tagsinput@2.4.0/dist/style.css';
</style>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
// https://mirari.cc/vue-fullscreen/
import fullscreen from 'vue-fullscreen'
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
import ctPaperViewNoteLeftSideComponents from '@/components/papers/view-appt-note/lhs-split-area/list-of-components.vue'
import ctPaperViewTopHeaderComponents from '@/components/papers/view-appt-note/templates/header-components.vue'
import ctPaperViewNoteRightSideComponents from '@/components/papers/view-appt-note/rhs-split-area/list-of-components.vue'
import ctTabsInDialogInCL from '@/components/non-temporal/components-container-in-change-layer/show-add-and-remove-tabs-in-dialog-ct' // Name expands to Component tabs in dialog in change layer
import ctLeftScreenExtensionDrawer from '@/components/non-temporal/components-container-in-lhs-screen-extension/left-drawer.vue'
import ctChangeInTabs from '@/components/papers/change-appt-note/show-vertical-tabs-in-dialog.vue'
import ctOneSearchBox from '@/components/papers/one-search-box/show-in-dialog.vue'
import ctRightScreenExtensionDrawer from '@/components/non-temporal/components-container-in-rhs-screen-extension/right-drawer.vue'
import ctMapDrawer from '@/components/non-temporal/map/drawer.vue'
import ctDeletedDrawer from '@/components/non-temporal/ct-deleted-rows/drawer.vue'
import clientSideTableOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import ctToGiveQuickAccessToFeatures from '~/components/non-temporal/quick-access-to-features/index.vue'

import ctToGiveProductTour from '~/components/non-temporal/product-tour/index.vue'
import ctInitOfComponents from './central-file-to-initialize-components.vue'

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

Vue.use(VueCookies)
Vue.use(fullscreen)
Vue.use(VueSplit)
Vue.use(VueScrollTo)
Vue.use(ToggleButton)

// For keyboard contraol Ref: https://github.com/g33kio/vue-mousetrap#readme
import VueMousetrap from 'vue-mousetrap'
Vue.use(VueMousetrap)

export default {
  components: {
    ctPaperViewNoteLeftSideComponents,
    ctPaperViewTopHeaderComponents,
    ctPaperViewNoteRightSideComponents,
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
    ctOneSearchBox,
  },
  data() {
    return {
      fullscreen: false,
      loggedInUuid: null,
      baseUrlForP20: process.env.baseUrlForP20
    }
  },
  created() {
    clientSideTableOfCommonForAllComponents.insert({
      data: {
        fieldName: 'ptUuid',
        fieldValue: this.$route.params.uuid,
      },
    }),
      this.mfGetLoggedInUserUuidAndInsertIntoOrm()

    var loggedInUserObj = clientSideTableOfCommonForAllComponents.query().where('fieldName', 'loggedInUserUuid').first()
    if (loggedInUserObj) {
      this.loggedInUuid = loggedInUserObj.fieldValue
    }
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
   
    async cfGetFullScreenMode(){
      const full_screen_mode = await clientSideTableOfCommonForAllComponents.find(
        'fullscreen'
      )
      
      if(full_screen_mode){
        if (full_screen_mode['fieldValue'] == 'true') {
         this.$refs['fullscreen'].toggle(true)
        } else {
          this.$refs['fullscreen'].toggle(false)
        }
      }
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
    /*toggleFullScreen() {
      this.$refs['fullscreen'].toggle() // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },*/
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen
    },
    log(message) {
      console.log(message)
    },

    mfGetLoggedInUserUuidAndInsertIntoOrm() {
      var userObj = $cookies.get('loginObj')
      if (userObj) {
        this.commonOrmTableForAllComponents = clientSideTableOfCommonForAllComponents.insert({
          data: {
            fieldName: 'loggedInUserUuid',
            fieldValue: userObj.publicUniqueId,
          },
        })
      }
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

/**
  Why we added the following css?
    Problem: Why has arrow pointing up and down come in the 2nd layer edit form left side menu.

    As per the plugin 'element-io el-tabs' (mentioned in webclient/node_modules/element-ui/lib/element-ui.common.js) up and down arrow will appear if container size of el-tabs navigation is lesser than nav size.

    In the second layer edit form popup left hand side, above mentioned container is containing the nav area.
    In our case, height of popup container is dynamic and it takes equanimity height of all the navBars.
    Hence, navSize is equal to the container size in our case which causes the up and down arrow.

    Posible solution was as follows:
    1. Give a height of the container such that it always greater than navSize
    2. Change in node_module library and introduce a '<=' instead of '<'
    3. Using a padding in 'el-tabs__nav-scroll'

    Solution 1 is cumbersome as the number of navBar is dynamic,
    hence height needs to be re-calculated everytime.

    Solution 2 is not preffered as altering library file may cause problem in future updation of the library.

    Solution 3 is what we have done to solve the problem.
      While going through the library I found container height is being calculated by the offsetHeight of the container element.
      As per this document - https://www.w3schools.com/jsref/prop_element_offsetheight.asp offsetHeight is height of an element including padding and border of the element.
      So, in order to make container height larger than navBar I am adding padding 5px in navBar container element or el-tabs__nav-scroll.
*/
.el-tabs__nav-scroll {
  padding: 5px 0;
}

/**
  Why we added this following css?
  Problem: Words get cut in past meds trials textarea. But it works fine on element.io website.
    When typing to at the edge t is on one line and O is on another line.

  Solution:
    Ref: https://stackoverflow.com/questions/33431090/textarea-breaks-words-and-doesnt-make-new-lines
 */
textarea.el-textarea__inner {
  word-break: normal;
}

.wrapper {
  position: relative;
  height: 400px;
}
.wrapper > .chart-container {
  height: 100%;
  width: 100%;
}
.wrapper > .btn-map-fullscreen {
  position: absolute;
  top: 3px;
  right: 6px;
  width: 36px;
  height: 36px;
  padding: 0;
  font-size: 28px;
  line-height: 28px;
  text-align: center;
  outline: none;
}
.wrapper > .fullscreen {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper > .fullscreen > .chart-container {
  height: 60%;
  width: 60%;
}
.wrapper > .fullscreen > .btn-map-fullscreen {
  left: 10px;
  top: 10px;
  right: auto;
  bottom: auto;
}

button.el-button.btn-map-fullscreen.el-button--primary.el-button--mini.is-round {
  padding: 7px;
}

.full-screen-button-mode-off {
  top: 0;
  position: absolute;
  left: 1377px;
}
.full-screen-button-mode-on {
  top: 0;
  position: absolute;
  right: 5px;
}


/**
  Start css for top header bar
*/
.paper_view_top_header {
    border-bottom: 1px solid rgba(64, 158, 255, 0.8);
    height: 85px;
    box-shadow: rgb(239 239 239) 0px 10px 10px;
    margin-bottom: 10px;
    padding: 10px;
    width: 1440px;
}
.header_name_row {
    margin-bottom: 5px;
}
.patient-name-section {
    font-weight: 600;
    font-size: 1.4rem;
}
.date_of_birth_section {
    text-align: left;
    cursor: pointer;
    display: inline-block;
    font-weight: 400;
    font-size: 1rem;
}

</style>
