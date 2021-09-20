<template>
  <div class="date_of_birth_section" @click="heading_clicked_so_set_up_state('date_of_birth')">{{ cfAge }}</div>
</template>

<script>
import clientTbl from '@/components/patient-data/date-of-birth/db/client-side/structure/date-of-birth-of-a-patient-table.js'
import commonForAllCts from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  computed: {
    cfLatestDataRowFromClientTbl() {
      let arOfObjectsFromClientDB = clientTbl.query().where('ROW_END', 2147483648000).last()
      return arOfObjectsFromClientDB
    },
    cfAge() {
      if(this.cfLatestDataRowFromClientTbl){
        const currentDate = new Date()
        const currentMS = currentDate.getTime()
        const diff = currentMS - this.cfLatestDataRowFromClientTbl.dateOfBirthInMilliSeconds
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
        return '(' + age + ' Years)'
      } else {
        return ''
      }
    },
  },
  methods: {
    heading_clicked_so_set_up_state(pFormDefId) {
      const updateState = commonForAllCts.insertOrUpdate({
        data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: pFormDefId }],
      })
    },
  }
}
</script>
