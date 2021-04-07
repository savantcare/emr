<template>
  <div>
    <div v-if="cfIsAllergyPresentForEdit > 0">
      <ctEditForm :_formDef="allergiesPresentFormDef" :firstProp="rowIdForPresent" />
    </div>
    <div v-else>
      <ctAddForm :_formDef="allergiesPresentFormDef" />
    </div>
    <div v-if="cfPresent === '#Yes#'">
      <el-divider>Add</el-divider>
        <allergiesAdd />
      <div v-if="rowIdForPresent > 0">
        <el-divider>Edit</el-divider>
          <allergiesEdit />
      </div>
    </div>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import ctEditForm from '@/components//papers/change-appt-note/templates/edit-form.vue'
import allergiesAdd from '@/components/patient-data/allergies/change-layer/allergy-add.vue'
import allergiesEdit from '@/components/patient-data/allergies/change-layer/allergy-edit.vue'
import allergiesPresentClientTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'
import { allergiesPresentFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'

export default {
  data: function () {
    return {
      allergiesPresentFormDef: allergiesPresentFormDef,
      rowIdForEdit: null,
      rowIdForPresent: null,
    }
  },

  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },

  components: {
    ctEditForm,
    ctAddForm,
    allergiesEdit,
    allergiesAdd,
  },

  mounted() {
    this.isAllergyPresentForEdit
  },

  computed: {
    cfPresent() {
      const status = allergiesPresentClientTbl.all()
      if (status && status.length >= 1) {
        const value = status[status.length - 1].present;
        return value
      }
    },

    cfIsAllergyPresentForEdit(){
      const allergiesPresentStatus = allergiesPresentClientTbl.isThereSavedPresentDataInTable()
      if (allergiesPresentStatus) {
        this.rowIdForPresent = allergiesPresentStatus[allergiesPresentStatus.length - 1]['clientSideUniqRowId']
      }
      return this.rowIdForPresent;
    }
  },
}
</script>
