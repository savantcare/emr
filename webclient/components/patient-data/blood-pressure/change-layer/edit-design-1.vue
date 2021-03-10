<template>
  <div>
    <el-col :span="4">
      <b>Edit Blood Pressure</b>
    </el-col>
    <el-col :span="20">
      <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
    </el-col>
  </div>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { bloodPressureFormDef } from '@/components/patient-data/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bloodPressureFormDef,
    }
  },
  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    ctEditFormTemplate,
  },
}
</script>
