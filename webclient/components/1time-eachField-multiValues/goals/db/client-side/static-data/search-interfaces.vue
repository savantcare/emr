<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    // Search interfaces to this component
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add goal',
        ctAbbr: 'addg',
        ctToShow: '1time-eachField-multiValues/goals/edit-layer/add.vue',
        displayLocation: 'edit-layer',
      },
    })

    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi rate goal',
        ctAbbr: 'mcg',
        ctToShow: '1time-eachField-multiValues/goals/edit-layer/ctMultiRateGoal.vue',
        displayLocation: 'edit-layer',
      },
    })

    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'goal',
        ctAbbr: 'g',
        ctToShow: '1time-eachField-multiValues/goals/g-vl.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
