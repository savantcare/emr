<template>
  <div v-if="numberOfChiefComplaintInDb > 0">
    Edit CC
    <chiefComplainEdit />
  </div>
  <div v-else>
    <chiefComplainAdd />
  </div>
</template>

<script>
import chiefComplainTbl from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import chiefComplainEdit from '@/components/patient-data/chief-complaint/change-layer/edit-design-1.vue'
import chiefComplainAdd from '@/components/patient-data/chief-complaint/change-layer/add-chief-complaint.vue'

export default {
  data: function () {
    return {}
  },
  components: {
    chiefComplainEdit,
    chiefComplainAdd,
  },
  computed: {
    numberOfChiefComplaintInDb() {
      //debugger

      const status = chiefComplainTbl.find(1)
      if (status) {
        const rowState = status['vnRowStateInSession']
        if (rowState.toString().startsWith('1')) {
          return true
        }
      }
      return false
    },
  },
}
</script>
