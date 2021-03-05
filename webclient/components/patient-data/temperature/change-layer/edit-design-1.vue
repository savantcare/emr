<template>
  <div>
    <el-col :span="4">
      <b>Temperature</b>
    </el-col>
    <el-col :span="20">
      <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
    </el-col>
  </div>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { temperatureFormDef } from '@/components/patient-data/temperature/db/client-side/structure/temperature-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: temperatureFormDef,
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
