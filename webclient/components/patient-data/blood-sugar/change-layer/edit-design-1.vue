<template>
  <div>
    <el-col :span="4">
      <b>Edit Blood Sugar</b>
    </el-col>
    <el-col :span="20">
      <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
    </el-col>
  </div>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { bloodSugarFormDef } from '@/components/patient-data/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bloodSugarFormDef,
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
