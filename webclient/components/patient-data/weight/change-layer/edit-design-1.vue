<template>
  <div>
    <el-col :span="4"> <b>Weight</b> </el-col>
    <el-col :span="20">
      <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
    </el-col>
  </div>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { weightFormDef } from '@/components/patient-data/weight/db/client-side/structure/weight-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: weightFormDef,
    }
  },
  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },

  mounted() {
  },

  components: {
    ctEditFormTemplate,
  },
}
</script>
