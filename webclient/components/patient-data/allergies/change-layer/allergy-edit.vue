<template>
  <div>
    <div v-for="(allergy, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <ctEditForm :_formDef="formDef" :first-prop="allergy['clientSideUniqRowId']" form-type="embedded" />
      </el-card>
    </div>
  </div>
</template>

<script>
import ctEditForm from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { allergiesFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import allergiesTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: allergiesFormDef,
    }
  },
  props: {
    firstProp: {
      type: Number,
    },
  },

  mounted() {
  },

  components: {
    ctEditForm,
  },

  computed: {
    daUniqueIdOfEachRowFromOrm() {
      const resultArFromOrm = allergiesTbl.fnGetAllRowsPossibleToEdit()
      return resultArFromOrm
    },
  },
}
</script>
