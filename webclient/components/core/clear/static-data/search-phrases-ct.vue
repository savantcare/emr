<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/components/core/search-phrases/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'clear',
        ctAbbr: 'clr',
        ctToShow: 'core/clear/index.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
