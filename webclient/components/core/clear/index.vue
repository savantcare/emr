<template><div></div></template>

<script>
import clientSideTblOfRightSideCards from '@/components/core/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfRightSideCards.deleteAll()
  },
}
</script>
