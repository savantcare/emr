<template><div></div></template>

<script>
import clientSideTblOfRightSideCards from '@/components/core/pts-view-layer-cards/db/client-side/structure/pts-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfRightSideCards.deleteAll()
  },
}
</script>
