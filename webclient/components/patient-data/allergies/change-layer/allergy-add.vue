<template>
  <div>
    <!-- <el-button>Yes</el-button> <el-button>No</el-button> <el-button>Not evaluated</el-button> <br /> -->
    <ctAddForm :_formDef="allergiesPresentFormDef"></ctAddForm>
    <br />
    <ctAddForm :_formDef="formDef"></ctAddForm>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { allergiesFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import { allergiesPresentFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: allergiesFormDef,
      allergiesPresentFormDef: allergiesPresentFormDef,
    }
  },

  components: {
    ctAddForm,
  },
}
</script>
