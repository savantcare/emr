<template><div></div></template>

<script>
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfCommonForAllComponents.insertOrUpdate({
      data: [{ fieldName: 'vblIsFeedDrawerVisible', fieldValue: true }],
    })
  },
}
</script>
