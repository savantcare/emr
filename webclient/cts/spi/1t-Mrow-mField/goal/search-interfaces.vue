<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    // Search interfaces to this component
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add goal',
        ctAbbr: 'addg',
        ctToShow: 'spi/1t-Mrow-mField/goal/cl/add.vue',
        displayLocation: 'cl',
      },
    })

    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multi rate goal',
        ctAbbr: 'mcg',
        ctToShow: 'spi/1t-Mrow-mField/goal/cl/ctMultiRateGoal.vue',
        displayLocation: 'cl',
      },
    })

    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'goal',
        ctAbbr: 'g',
        ctToShow: 'spi/1t-Mrow-mField/goal/g-vl.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
