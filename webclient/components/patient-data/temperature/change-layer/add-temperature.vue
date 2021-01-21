<template>
  <div>
    <el-col :span="4"> Temperature </el-col>
    <el-col :span="20">
      <ctAddForm :_formDef="formDef"></ctAddForm>
    </el-col>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { temperatureFormDef } from '@/components/patient-data/temperature/db/client-side/structure/temperature-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: temperatureFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
