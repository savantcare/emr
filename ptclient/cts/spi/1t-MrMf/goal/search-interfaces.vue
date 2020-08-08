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
        ctToShow: 'spi/goal/cl/ctAddGoal.vue',
        displayLocation: 'cl',
      },
    })

    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multi rate goal',
        ctAbbr: 'mcg',
        ctToShow: 'spi/goal/cl/ctMultiRateGoal.vue',
        displayLocation: 'cl',
      },
    })

    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'goal',
        ctAbbr: 'g',
        ctToShow: 'spi/goal/g-vl.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
