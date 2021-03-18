<template>
  <div v-if="rowIdForPresent > 0">
    <ctEditFormTemplate :_formDef="allergiesPresentFormDef" :firstProp="rowIdForPresent"></ctEditFormTemplate>
    <div v-if="present === '#Yes#'">
      <el-divider>Add</el-divider>
        <ctAddForm :_formDef="formDef"></ctAddForm>
      <el-divider>Edit</el-divider>
        <div v-if="rowIdForEdit > 0">
          <div v-for="(aller, index) in daUniqueIdOfEachRowFromOrm" :key="index">
            <el-card>
              <allergiesEdit :first-prop="aller['clientSideUniqRowId']" form-type="embedded" />
            </el-card>
          </div>
        </div>
    </div>
  </div>
  <div v-else>
    <allergiesAdd />
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { allergiesFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import { allergiesPresentFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'
import allergiesTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import allergiesPresentClientTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'
import allergiesEdit from '@/components/patient-data/allergies/change-layer/allergy-edit.vue'
import allergiesAdd from '@/components/patient-data/allergies/change-layer/allergy-add.vue'

export default {
  data: function () {
    return {
      formDef: allergiesFormDef,
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
    ctEditFormTemplate,
    ctAddForm,
    allergiesEdit,
    allergiesAdd,
  },

  mounted() {
    const allergiesPresentStatus = allergiesPresentClientTbl.isThereSavedPresentDataInTable()
    if (allergiesPresentStatus) {
      this.rowIdForPresent = allergiesPresentStatus[allergiesPresentStatus.length - 1]['clientSideUniqRowId']
    }

    const allergiesStatus = allergiesTbl.isThereSavedPresentDataInTable()
    if (allergiesStatus) {
      this.rowIdForEdit = allergiesStatus[allergiesStatus.length - 1]['clientSideUniqRowId']
    }
  },

  computed: {
    present() {
      const status = allergiesPresentClientTbl.all()
      if (status && status.length > 1) {
        const value = status[status.length - 1].present;
        return value
      }
    },
    daUniqueIdOfEachRowFromOrm() {
      const resultArFromOrm = allergiesTbl.fnGetAllRowsPossibleToEdit()
      return resultArFromOrm
    },
  },
}
</script>
