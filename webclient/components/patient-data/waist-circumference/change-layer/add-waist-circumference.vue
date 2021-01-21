<template>
  <div>
    <el-col :span="4"> Waist Circumference </el-col>
    <el-col :span="20">
      <ctAddForm :_formDef="formDef"></ctAddForm>
    </el-col>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { waistCircumferenceFormDef } from '@/components/patient-data/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: waistCircumferenceFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
