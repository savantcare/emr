<template>
  <div>
    <!-- <el-button>Yes</el-button> <el-button>No</el-button> <el-button>Not evaluated</el-button> <br /> -->
    <ctEditFormTemplate :_formDef="allergiesPresentFormDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
    <br />
    <div v-if="present === '#Yes#'">
      <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
    </div>
  </div>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { allergiesFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import { allergiesPresentFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'

import allergiesPresentClientTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: allergiesFormDef,
      allergiesPresentFormDef: allergiesPresentFormDef,
    }
  },

  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },

  components: {
    ctEditFormTemplate,
  },

  computed: {
    present() {
      const status = allergiesPresentClientTbl.find(1)
      if (status) {
        const value = status['present'];
        return value
      }
    },
  },
}
</script>
