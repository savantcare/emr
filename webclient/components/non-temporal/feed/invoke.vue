<template><div></div></template>

<script>
import clientSideTableOfCommonForAllComponents from '~/components/ptinfo-single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

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
