<template>
  <div></div>
</template>

<script>
import clientTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    // Search interfaces to this component
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'add goal',
        ctAbbr: 'addg',
        ctToShow: 'temporal/goals/edit-layer/add.vue',
        displayLocation: 'edit-layer',
      },
    })

    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi rate goal',
        ctAbbr: 'mcg',
        ctToShow: 'temporal/goals/edit-layer/ctMultiRateGoal.vue',
        displayLocation: 'edit-layer',
      },
    })

    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'goal',
        ctAbbr: 'g',
        ctToShow: 'temporal/goals/g-vl.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
