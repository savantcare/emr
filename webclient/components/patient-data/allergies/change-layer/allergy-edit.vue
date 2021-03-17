<template>
  <div>
    <!-- <el-button>Yes</el-button> <el-button>No</el-button> <el-button>Not evaluated</el-button> <br /> -->
    <ctEditFormTemplate :_formDef="allergiesPresentFormDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
    <div v-if="present === '#Yes#'">
      <el-divider>Add</el-divider>
        <ctAddForm :_formDef="formDef"></ctAddForm>
      <el-divider>Edit</el-divider>
        <div v-if="rowIdForEdit > 0">
          <div v-for="(aller, index) in daUniqueIdOfEachRowFromOrm" :key="index">
            <el-card>
              <ctEditFormTemplate :_formDef="formDef" :firstProp="aller['clientSideUniqRowId']" form-type="embedded"></ctEditFormTemplate>
            </el-card>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { allergiesFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import { allergiesPresentFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'
import allergiesTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import allergiesPresentClientTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: allergiesFormDef,
      allergiesPresentFormDef: allergiesPresentFormDef,
      rowIdForEdit: null,
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
  },

  mounted() {
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
