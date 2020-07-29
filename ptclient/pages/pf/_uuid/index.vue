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
  <div @mouseleave="mouseleave">
    <!-- Prop explanation:
        :gutterSize="0"
          This is thickness of the line between left and right panels. This line is used to adjust size of left and right
      -->
    <Split style="height: 900px; width: 1400px;" :gutter-size="4">
      <SplitArea :size="75">
        <ctMsVlCards></ctMsVlCards>
      </SplitArea>
      <SplitArea id="ptsvl" :size="25">
        <ctCsVlCards></ctCsVlCards>
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
import ctMsVlCards from '@/cts/core/manage-mtsvl-cards/list-of-cards.vue'
import ctCsVlCards from '@/cts/core/manage-ptsvl-cards/list-of-cards.vue'
import ctTabsInDialogInCL from '@/cts/core/manage-cl-tabs/ct-show-add-and-remove-tabs-in-dialog'
import ctFeedDrawer from '@/cts/core/feed/drawer.vue'
import ctMapDrawer from '@/cts/core/map/drawer.vue'

// The name above expands to Component tabs in dialog in change layer

// say the user enter the rex command 10 times. I need to scroll to the bottom of the cards
// so search box is given a ID and then #manage-ptsvl-cards is used to scroll down.
const VueScrollTo = require('vue-scrollto') // Ref: https://github.com/rigor789/vue-scrollto#as-a-vue-directive

Vue.use(VueSplit)
Vue.use(VueScrollTo)

export default {
  components: {
    ctMsVlCards,
    ctCsVlCards,
    ctTabsInDialogInCL,
    ctFeedDrawer,
    ctMapDrawer,
  },
  data() {
    return {}
  },
  mounted() {
    // when page first loads the change layer tabs are set to not show
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
