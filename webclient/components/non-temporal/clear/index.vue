<template><div></div></template>

<script>
import clientTblOfDynamicCards from '@/components/non-temporal/search-phrases/db/client-side/structure/dynamic-cards-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfDynamicCards.deleteAll()
  },
}
</script>
