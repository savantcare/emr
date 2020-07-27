<template>
  <!--  Prop explanation:
          v-on:mouseleave="mouseleave"
          Goal: Make it very easy to get the feed
          When the user takes the mouse to the left edge of the browser then bring the feed up
          Why not put it inside <SplitArea> the event does not get fired.
          Why not put a div inside and then put mouseleave event over there?
            when go from msvl to csvl the event gets fired.
        Ref: https://codepen.io/intotheprogram/pen/ZjxZdg 
    -->
  <div @mouseleave="mouseleave">
    <!-- Prop explanation:
        :gutterSize="0"
          This is thickness of the line between left and right panels. This line is used to adjust size of left and right
      -->
    <Split style="height: 900px; width: 1400px;" :gutter-size="4">
      <SplitArea :size="75">
        <ctMsVlCards></ctMsVlCards>
      </SplitArea>
      <SplitArea id="csvl" :size="25">
        <!-- Why not use <keep-alive> before el-card ?
            <keep-alive> before the card creates problem since multiple cards then get inside keep alive   
            <keep-alive> is designed for the case where it has one direct child component that is being toggled. 
            It does not work if you have v-for inside it. 
            When there are multiple conditional children, as above, <keep-alive> requires that only one child is rendered at a time.
            Ref: https://vuejs.org/v2/api/#keep-alive

            Similar working code:
            https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-keep-alive-with-dynamic-components?file=/index.html:296-321
          -->
        <el-card v-for="card in cfArCards" :key="card.id">
          <!-- Using https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
          <!--  Why not use keep-alive before <component v-bind:is="card.ctToShow"></component> 
                Sorrounding component with keepAlive does not help. Since previous rendering of rex
                is not hidden. When user types rex 2 times, rex is being displayed 2 times

                The vue inbuilt component <component /> acts as a placeholder for another component and accepts a special :is prop with the name of the component it should render.                
            -->
          <component :is="card.ctToShow"></component>
        </el-card>
        <!-- ctVLSearchBox as per glossary is Component View layer search box 
             Top or bottom of the for loop -> determines if search comes at top or bottom of the other cards
             Advantages of having search box at the top:
              1. We are used to reading from top to bottom
              2. If I give the command rec and that medications card on top of it. 
                  If window is at bottom:  I will loose the top of meds card. 
                  If window is at top:  I will loose the bottom of the meds card.
                  Each card (including meds) the card top will have more useful information.
              3. If there is a single rec card and that is longer then the space available when I have search at top I will info at bottom of the card.
             Advantages of having search box at the top:
              1. Everyone uses chat and in chat the box to type is at the bottom

              Choice in July 2020 by VK: keep search box at botoom

              Do not make the mistake of making something like this configurable. When needed the change should be made directly in the code
        -->
        <ctVLSearchBox></ctVLSearchBox>
      </SplitArea>
    </Split>
    <!-- tab-dialog is present in patientFile.vue but in hidden state -->
    <ctTabsInDialogInCL></ctTabsInDialogInCL>
    <ctFeedDrawer></ctFeedDrawer>
    <ctMapDrawer></ctMapDrawer>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSplit from 'vue-split-panel'
import ctMsVlCards from '@/cts/core/manage-msvl-cards/list-of-cards.vue'
import ctVLSearchBox from '@/cts/core/manage-csvl-cards/load-search-phrases-and-handle-selection'
import ctTabsInDialogInCL from '@/cts/core/manage-cl-tabs/ct-show-add-and-remove-tabs-in-dialog'
import ctFeedDrawer from '@/cts/core/feed/drawer.vue'
import ctMapDrawer from '@/cts/core/map/drawer.vue'

// The name above expands to Component tabs in dialog in change layer

// say the user enter the rex command 10 times. I need to scroll to the bottom of the cards
// so search box is given a ID and then #manage-csvl-cards is used to scroll down.
const VueScrollTo = require('vue-scrollto') // Ref: https://github.com/rigor789/vue-scrollto#as-a-vue-directive

Vue.use(VueSplit)
Vue.use(VueScrollTo)

export default {
  components: {
    ctFeedDrawer,
    ctMapDrawer,
    ctTabsInDialogInCL,
    ctVLSearchBox,
    ctMsVlCards,
  },
  data() {
    return {}
  },
  computed: {
    cfArCards: {
      get() {
        return this.$store.state.vstObjCardsInCSOfVL.arCards
      },
      set(value) {
        this.$store.commit('mtfSetArCards', value)
      },
    },
  },
  mounted() {
    // when page first loads the L2 tabs are set to not show
    this.$store.commit('mtfSetTabDialogVisibility', false)
  },
  methods: {
    log(message) {
      console.log(message)
    },
    mouseleave(event) {
      // console.log('mouse leave', event)

      // How to identify which side the mouse left https://stackoverflow.com/a/48281888
      if (event.clientX <= 0) {
        // This is when the mouse leave from the left
        if (event.clientY <= 200) {
          // This is the top corner
          this.$store.commit('mtfSetFeedDrawerVisibility', true)
        }
      }
    },
  },
}
</script>
