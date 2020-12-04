<template>
  <div>
    Has allergies? <el-button>Yes</el-button> <el-button>No</el-button> <el-button>Not evaluated</el-button> <br />
    <br />
    <ctAddForm :_formDef="formDef"></ctAddForm>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { allergiesFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: allergiesFormDef,
    }
  },

  components: {
    ctAddForm,
  },
}
</script>
