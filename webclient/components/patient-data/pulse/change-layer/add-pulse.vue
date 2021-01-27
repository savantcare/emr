<template>
  <div>
    <el-col :span="4"> Pulse </el-col>
    <el-col :span="20">
      <ctAddForm :_formDef="formDef"></ctAddForm>
    </el-col>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { pulseFormDef } from '@/components/patient-data/pulse/db/client-side/structure/pulse-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: pulseFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
