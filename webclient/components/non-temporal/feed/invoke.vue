<template><div></div></template>

<script>
import clientSideTableOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTableOfCommonForAllComponents.insertOrUpdate({
      data: [{ fieldName: 'vblIsFeedDrawerVisible', fieldValue: true }],
    })
  },
}
</script>
