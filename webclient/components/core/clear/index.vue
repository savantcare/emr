<template><div></div></template>

<script>
import clientSideTblOfRightSideCards from '@/components/core/manage-pts-view-layer-cards/db/client-side/structure/table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfRightSideCards.deleteAll()
  },
}
</script>
