<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/vl-search/orm-search-phrases-of-ct'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'clear',
        ctAbbr: 'clr',
        ctToShowInCsOfVl: 'core/clear/index.vue',
        layer: 'view',
      },
    })
  },
}
</script>
