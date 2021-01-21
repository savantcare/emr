<template>
  <div>
    <el-col :span="4"> Blood Pressure </el-col>
    <el-col :span="20">
      <ctAddForm :_formDef="formDef"></ctAddForm>
    </el-col>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { bloodPressureFormDef } from '@/components/patient-data/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bloodPressureFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
