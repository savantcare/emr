<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'

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
        ctToShowInCL: 'spi/goal/cl/ctAddGoal.vue',
        layer: 'change',
      },
    })

    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multi rate goal',
        ctAbbr: 'mcg',
        ctToShowInCL: 'spi/goal/cl/ctMultiRateGoal.vue',
        layer: 'change',
      },
    })

    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'goal',
        ctAbbr: 'g',
        ctToShowInCL: 'spi/goal/g-vl.vue',
        layer: 'view',
      },
    })
  },
}
</script>
