<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblOfMasterName from '@/components/1time-1row-mField/name/db/client-side/structure/master-table-of-name.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    clientSideTblOfMasterName.insert({
      data: {
        nameFieldMasterId: i,
        nameFieldDescription: 'First name',
      },
    })

    i = i + 1
    clientSideTblOfMasterName.insert({
      data: {
        nameFieldMasterId: i,
        nameFieldDescription: 'Middle name',
      },
    })

    i = i + 1
    clientSideTblOfMasterName.insert({
      data: {
        nameFieldMasterId: i,
        nameFieldDescription: 'Last name',
      },
    })
  },
}
</script>
