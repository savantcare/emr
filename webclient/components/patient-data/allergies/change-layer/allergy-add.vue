<template>
  <div>
    <!-- <el-button>Yes</el-button> <el-button>No</el-button> <el-button>Not evaluated</el-button> <br /> -->
    <ctAddForm :_formDef="allergiesPresentFormDef"></ctAddForm>
    <br />
    <div v-if="present === '#Yes#'">
      <el-divider>Add</el-divider>
        <ctAddForm :_formDef="formDef"></ctAddForm>
      <el-divider>Edit</el-divider>
    </div>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import allergiesPresentClientTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'
import { allergiesFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import { allergiesPresentFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'

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

  computed: {
    present() {
      const status = allergiesPresentClientTbl.find(1)
      if (status) {
        const value = status['present']
        return value
      }
    },
  },
}
</script>
