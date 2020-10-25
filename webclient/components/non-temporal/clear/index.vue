<template><div></div></template>

<script>
import clientTblOfRightSideCards from '@/components/non-temporal/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfRightSideCards.deleteAll()
  },
}
</script>
