<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'

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
        ctToShow: 'pt-info/single/1time-Mrow-mField/goal/edit-layer/add.vue',
        displayLocation: 'cl',
      },
    })

    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi rate goal',
        ctAbbr: 'mcg',
        ctToShow: 'pt-info/single/1time-Mrow-mField/goal/edit-layer/ctMultiRateGoal.vue',
        displayLocation: 'cl',
      },
    })

    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'goal',
        ctAbbr: 'g',
        ctToShow: 'pt-info/single/1time-Mrow-mField/goal/g-vl.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
