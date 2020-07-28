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
        value: 'feed',
        ctAbbr: 'fd',
        ctToShow: 'core/feed/invoke.vue',
        location: 'csvl',
      },
    })
  },
}
</script>
