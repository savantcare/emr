<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    // Search interfaces to this component
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'add goal',
        ctAbbr: 'addg',
        ctToShow: 'pt-info/single/1time-Mrow-mField/goal/change-layer/add.vue',
        displayLocation: 'cl',
      },
    })

    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'multi rate goal',
        ctAbbr: 'mcg',
        ctToShow: 'pt-info/single/1time-Mrow-mField/goal/change-layer/ctMultiRateGoal.vue',
        displayLocation: 'cl',
      },
    })

    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'goal',
        ctAbbr: 'g',
        ctToShow: 'pt-info/single/1time-Mrow-mField/goal/g-vl.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
