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
        value: 'map',
        ctAbbr: 'mp',
        ctToShow: 'pt-info/combined/map/invoke.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
