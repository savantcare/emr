<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import tableSSMasterList from '@/components/pt-info/single/1t-Mrow-1Field/ss/db/vuex-orm/table-master-list-of-ss.js'

export default {
  data() {
    return {}
  },
  mounted() {
    tableSSMasterList.insert({
      data: {
        description: 'Spent 10 mins with patient',
      },
    })
    tableSSMasterList.insert({
      data: {
        description: 'Spent 15 mins with patient',
      },
    })
    tableSSMasterList.insert({
      data: {
        description: 'Spent 20 mins with patient',
      },
    })
    tableSSMasterList.insert({
      data: {
        description: 'Spent 25 mins with patient',
      },
    })
    tableSSMasterList.insert({
      data: {
        description: 'Spent 30 mins with patient',
      },
    })
  },
}
</script>
