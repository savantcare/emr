<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import ormSSMasterList from '@/cts/spi/1t-Mrow-1Field/ss/db/vuex-orm/orm-master-list-of-ss.js'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSSMasterList.insert({
      data: {
        description: 'Spent 10 mins with patient',
      },
    })
    ormSSMasterList.insert({
      data: {
        description: 'Spent 15 mins with patient',
      },
    })
    ormSSMasterList.insert({
      data: {
        description: 'Spent 20 mins with patient',
      },
    })
    ormSSMasterList.insert({
      data: {
        description: 'Spent 25 mins with patient',
      },
    })
    ormSSMasterList.insert({
      data: {
        description: 'Spent 30 mins with patient',
      },
    })
  },
}
</script>
