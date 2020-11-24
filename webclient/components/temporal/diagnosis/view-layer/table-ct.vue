<!-- Reference implementation -->
<template>
  <tableView :_formDef="formDef" />
    <!-- :showTableHeader="false" -->
</template>

<script>
import tableView from '@/components//def-processors/view/table-design'
import { diagnosisFormDef } from '@/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
export default {
  components: { tableView },
  data: function () {
    return {
      formDef: diagnosisFormDef,
    }
  },
}
</script>