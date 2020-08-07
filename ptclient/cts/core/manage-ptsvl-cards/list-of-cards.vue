<template>
  <div>
    <!-- Why not use <keep-alive> before el-card ?
            <keep-alive> before the card creates problem since multiple cards then get inside keep alive   
            <keep-alive> is designed for the case where it has one direct child component that is being toggled. 
            It does not work if you have v-for inside it. 
            When there are multiple conditional children, as above, <keep-alive> requires that only one child is rendered at a time.
            Ref: https://vuejs.org/v2/api/#keep-alive

            Similar working code:
            https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-keep-alive-with-dynamic-components?file=/index.html:296-321
          -->
    <el-card v-for="card in cfArCardsInCsOfVl" :key="card.id">
      <!-- Using https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
      <!--  Why not use keep-alive before <component v-bind:is="card.ctToShow"></component> 
                Sorrounding component with keepAlive does not help. Since previous rendering of rex
                is not hidden. When user types rex 2 times, rex is being displayed 2 times

                The vue inbuilt component <component /> acts as a placeholder for another component and accepts a special :is prop with the name of the component it should render.                
            -->
      <component :is="card.ctToShow"></component>
    </el-card>
    <!-- ctVlSearchBox as per glossary is Component View layer search box 
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
    <ctVlSearchBox></ctVlSearchBox>
  </div>
</template>
<script>
import ctVlSearchBox from '@/cts/core/manage-ptsvl-cards/load-search-phrases-and-handle-selection'

export default {
  components: {
    ctVlSearchBox,
  },
  data() {
    return {}
  },
  computed: {
    cfArCardsInCsOfVl: {
      get() {
        return this.$store.state.vstObjCardsInPtsOfVl.arOfCardsInPtsOfVl
      },
      set(value) {
        this.$store.commit('mtfSetArCardsInCsOfVl', value)
      },
    },
  },
}
</script>
