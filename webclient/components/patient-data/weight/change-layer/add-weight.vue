<template>
  <div>
    <el-col :span="4"> Weight </el-col>
    <el-col :span="20">
      <ctAddForm :_formDef="formDef"></ctAddForm>
    </el-col>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { weightFormDef } from '@/components/patient-data/weight/db/client-side/structure/weight-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: weightFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
