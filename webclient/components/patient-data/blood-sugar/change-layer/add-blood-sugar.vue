<template>
  <div>
    <el-col :span="4"> Blood Sugar </el-col>
    <el-col :span="20">
      <ctAddForm :_formDef="formDef"></ctAddForm>
    </el-col>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { bloodSugarFormDef } from '@/components/patient-data/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bloodSugarFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
