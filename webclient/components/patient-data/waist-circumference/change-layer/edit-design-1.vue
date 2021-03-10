<template>
<div>
    <el-col :span="4"> <b>Edit Waist Circumference</b> </el-col>
    <el-col :span="20">
  <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
  </el-col>
  </div>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { waistCircumferenceFormDef } from '@/components/patient-data/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: waistCircumferenceFormDef,
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
