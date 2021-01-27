<template>
  <div>
    <el-col :span="4"> BMI </el-col>
    <el-col :span="20">
      <ctAddForm :_formDef="formDef"></ctAddForm>
    </el-col>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { bmiFormDef } from '@/components/patient-data/bmi/db/client-side/structure/bmi-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bmiFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
