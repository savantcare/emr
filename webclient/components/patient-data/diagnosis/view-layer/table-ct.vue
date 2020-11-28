<!-- Reference implementation -->
<template>
  <tableView :propFormDef="formDef" />
  <!-- :showTableHeader="false" -->
</template>

<script>
import tableView from '@/components//papers/note-view/templates/table-design'
import { diagnosisFormDef } from '@/components/patient-data/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
export default {
  components: { tableView },
  data: function () {
    return {
      formDef: diagnosisFormDef,
    }
  },
}
</script>
