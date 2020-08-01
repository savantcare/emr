<template>
  <div></div>
</template>
<script>
import { REMINDER_API_URL } from '../const.js'
import ormRem from '@/cts/spi/rem/db/vuex-orm/rem.js'
export default {
  data() {
    return {}
  },

  async mounted() {
    // check length and only load if its empty
    // Also need to restrict the load to current patient
    const proRemsFromDB = await ormRem.api().get(`${REMINDER_API_URL}/getAll`)
    if (proRemsFromDB.ok) {
    }
  },
}
</script>
