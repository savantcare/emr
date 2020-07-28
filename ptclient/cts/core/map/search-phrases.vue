<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'map',
        ctAbbr: 'mp',
        ctToShow: 'core/map/invoke.vue',
        location: 'csvl',
      },
    })
  },
}
</script>
