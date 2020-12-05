<template>
  <div v-if="numberOfChiefComplaintInDb > 0">Invoke edit</div>
  <div v-else>
    <ctAddForm :_formDef="formDef"></ctAddForm>
  </div>
</template>

<script>
import ctAddForm from '@/components/papers/note-change/templates/add-form.vue'
import { chiefComplaintFormDef } from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import chiefComplainTbl from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: chiefComplaintFormDef,
    }
  },
  components: {
    ctAddForm,
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
