<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <div>
    <!-- Goal: Show multiple add rows along with remove each row. At end A. Reset B. Add more C. Reviewed -->
    <el-form>
      <div v-if="cfGetClientSideTableNewRowsInEditState.length">
        <el-form-item
          v-for="ormRow in cfGetClientSideTableNewRowsInEditState"
          :key="ormRow.clientSideUniqRowId"
          :class="mfGetCssClassNameForEachDataRow(ormRow.clientSideUniqRowId)"
        >
          <!-- Prop explaination  Read prop explanation for span=4 on line 19 -->
          <el-col :span="20" :class="ormRow.validationClass">
            <el-select 
              ref="masterDiagnosisId"
              :value="mfGetFldValue(ormRow.clientSideUniqRowId, 'masterDiagnosisId')"
              @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, 'masterDiagnosisId')"
              style="width: 100%"
              filterable 
              placeholder="Select diagnosis"
              @change="fnChangeDiagnosis(ormRow.masterDiagnosisId, ormRow.clientSideUniqRowId)">
              <el-option
                v-for="item in cfGetMasterListOfDiagnosis()"
                :key="item.masterDiagnosisId"
                :label="item.diagnosisName"
                :value="item.masterDiagnosisId">
              </el-option>
            </el-select>
            <div v-if="ormRow.isValidationError" class="el-form-item__error">
              Please select diagnosis
            </div>
          </el-col>
          <el-col :span="4">
            <el-button
              plain
              type="warning"
              style="float: right"
              @click="mfDeleteRowInEditLayerientSideTable(ormRow.clientSideUniqRowId)"
              >Remove</el-button
            >
          </el-col>
          <el-col :span="20">
            <el-date-picker
              ref="startDate"
              type="date"
              :value="mfGetFldValue(ormRow.clientSideUniqRowId, 'startDate')"
              @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, 'startDate')"
              placeholder="Pick a day">
            </el-date-picker>
          </el-col>
          

          <!-- Other row -->
          <el-col>
            <el-input
              ref="assessment"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 10 }"
              placeholder="Please enter the assessment .."
              :value="mfGetFldValue(ormRow.clientSideUniqRowId, 'assessment')"
              @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, 'assessment')"
            ></el-input>
          </el-col>
        </el-form-item>
      </div>
      <!-- If there are no edit state rows then create a empty row for faster data input -->
      <p v-else>{{ mfAddEmptyRowInEditLayerientSideTable() }}</p>
      <el-form-item>
        <el-button type="primary" plain @click="mfOnReviewed">Reviewed</el-button>
        <el-button type="primary" plain @click="mfAddEmptyRowInEditLayerientSideTable">Add more</el-button>
        <el-button type="warning" plain @click="mfOnResetForm">Reset form</el-button>
      </el-form-item>
    </el-form>
    <!-- Goal: Show data at the time of sending to server -->
    <el-table
      v-if="cfGetClientSideTableApiSendingStateRows.length > 0"
      :data="cfGetClientSideTableApiSendingStateRows"
      style="width: 100%; background: #f0f9eb">
      <el-table-column label="Diagnosiss sending to server">
        <div slot-scope="{row}" class="td-number">
          {{fnGetDiagnosisNameById(row.masterDiagnosisId)}}
        </div>
      </el-table-column>
      <!-- <el-table-column prop="diagnosisName" label="Diagnosiss sending to server"></el-table-column> -->
    </el-table>

    <!-- Goal: Show data saved successfuly this session -->
    <el-table
      v-if="cfGetClientSideTableApiSuccessStateRows.length > 0"
      :data="cfGetClientSideTableApiSuccessStateRows"
      style="width: 100%; background: #f0f9eb">
      <el-table-column label="Diagnosiss added this session">
        <div slot-scope="{row}" class="td-number">
          {{fnGetDiagnosisNameById(row.masterDiagnosisId)}}
        </div>
      </el-table-column>
    </el-table>
    <!-- Goal: Show data of API that failed in this session -->
    <el-table
      v-if="cfGetClientSideTableApiErrorStateRows.length > 0"
      :data="cfGetClientSideTableApiErrorStateRows"
      style="width: 100%; background: #f0f9eb"
    >
    <el-table-column label="Error: Diagnosiss attempted but failed to save">
      <div slot-scope="{row}" class="td-number">
        {{fnGetDiagnosisNameById(row.masterDiagnosisId)}}
      </div>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>

import clientSideTblPatientDiagnosis from '../db/client-side/structure/patient-table-of-diagnosis'
import clientSideTblMasterDiagnosis from '../db/client-side/structure/master-table-of-diagnosis'

export default {
  data() {
    return {
      isClickReviewed: false
    }
  },
  computed: {
    // clientSideTblPatientDiagnosis functions can not be directly called from template. hence computed functions have been defined.
    cfGetClientSideTableNewRowsInEditState() {
      return clientSideTblPatientDiagnosis.fnGetNewRowsInEditState()
    },
    cfGetClientSideTableReadyToReviewedStateRows() {
      return clientSideTblPatientDiagnosis.fnGetNewRowsInReadyToReviewedState()
    },
    cfGetClientSideTableApiSuccessStateRows() {
      return clientSideTblPatientDiagnosis.fnGetNewRowsInApiSuccessState()
    },
    cfGetClientSideTableApiErrorStateRows() {
      return clientSideTblPatientDiagnosis.fnGetNewRowsInApiErrorState()
    },
    cfGetClientSideTableApiSendingStateRows() {
      return clientSideTblPatientDiagnosis.fnGetNewRowsInApiSendingState();
    },
  },
  methods: {
    fnGetDiagnosisNameById(masterDiagnosisId) {
      let getMasterOfDiagnosis = clientSideTblMasterDiagnosis
        .query()
        .where('masterDiagnosisId', masterDiagnosisId)
        .first()
        
      return getMasterOfDiagnosis != null ? getMasterOfDiagnosis.diagnosisName : '';
    },
    cfGetMasterListOfDiagnosis: function () {
      let arOfObjectsFromClientSideMasterDB = clientSideTblMasterDiagnosis
        .query()
        .with('linkWithPatient')
        .where('ROW_END', 2147483648000)
        .get()
      return arOfObjectsFromClientSideMasterDB
    },
    async fnChangeDiagnosis(selectItem, clientSideUniqRowId) {
      // rowItem.masterDiagnosisId = selectItem;
      await clientSideTblPatientDiagnosis.update({
        where: (record) =>
          record.clientSideUniqRowId === clientSideUniqRowId,
        data: {
          masterDiagnosisId: selectItem
        },
      })
    },
    getNowDate: function() {
      const nowDate = Date.now();
      return nowDate;
    },
    async mfAddEmptyRowInEditLayerientSideTable() {
      // TODO: this should be part of base class
      const arFromClientSideTable = await clientSideTblPatientDiagnosis.insert({
        data: {
          masterDiagnosisId: 0,
          assessment: '',
          startDate: this.getNowDate(),
          vnRowStateInSession: 2, // For meaning of diff values read webclient/cts/non-temporal/crud/forms.md
          ROW_START: Math.floor(Date.now()), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
        },
      })
      if (!arFromClientSideTable) {
        console.log('FATAL ERROR')
      }
      this.mfManageFocus()
    },
    mfManageFocus() {
      // Ref: https://stackoverflow.com/questions/60291308/vue-js-this-refs-empty-due-to-v-if
      // console.log('refs', this.$refs)
      if (this.$refs.masterDiagnosisId) {
        const lastElement = this.$refs.masterDiagnosisId.length
        if(this.$refs.masterDiagnosisId[lastElement - 1].value === 0) {
          // set select diagnosis field value blank
          this.$refs.masterDiagnosisId[lastElement - 1].value = '';
        }
        console.log('this.isClickReviewed', this.isClickReviewed);
        if(this.isClickReviewed != true) {
          this.$refs.masterDiagnosisId[lastElement - 1].focus()
        }
      }
    },
    // Cannot call clientSideTblPatientDiagnosis function directly from template so need to have a method function to act as a pipe between template and the ORM function
    mfGetFldValue(pClientSideRowId, pFldName) {
      return clientSideTblPatientDiagnosis.fnGetFldValue(pClientSideRowId, pFldName)
    },
    mfSetFldValueUsingCache(pEvent, pClientSideRowId, pFldName) {
      const rowStatus = 24
      clientSideTblPatientDiagnosis.fnSetFldValue(pEvent, pClientSideRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    mfGetCssClassNameForEachDataRow(pClientSideRowId) {
      const arFromClientSideTable = clientSideTblPatientDiagnosis.find(pClientSideRowId)
      if (arFromClientSideTable && arFromClientSideTable.vnRowStateInSession === 24) {
        // New -> Changed
        return 'unsaved-data'
      }
      return ''
    },
    async mfDeleteRowInEditLayerientSideTable(pClientSideRowId) {
      await clientSideTblPatientDiagnosis.delete(pClientSideRowId)
      this.mfManageFocus()
    },
    mfOnResetForm(formName) {
      clientSideTblPatientDiagnosis.fnDeleteNewRowsInEditState()
    },
    async mfOnReviewed() {
      /*
        Goal: If i submitted 4 records with a empty record at once. We need to run submit process on those records which is not empty.
        The computed function 'cfGetClientSideTableReadyToReviewedStateRows' returns all the newly added row which is not empty from clientSideTblPatientDiagnosis ie; 'vnRowStateInSession' = 24
      */
      const arFromClientSideTable = this.cfGetClientSideTableReadyToReviewedStateRows // calling cf instead of clientSideTblPatientDiagnosis since get benefit of caching.
      if (arFromClientSideTable.length) {
        this.isClickReviewed = true;
        console.log('unsaved data found', arFromClientSideTable)
        for (let i = 0; i < arFromClientSideTable.length; i++) {
          if (arFromClientSideTable[i].masterDiagnosisId == 0 || arFromClientSideTable[i].masterDiagnosisId == '') {
            // Validation check
            await clientSideTblPatientDiagnosis.update({
              where: (record) =>
                record.clientSideUniqRowId === arFromClientSideTable[i].clientSideUniqRowId,
              data: {
                validationClass: 'validaionErrorExist',
                vnRowStateInSession: '2456', // New -> Changed -> Requested save -> form error
                isValidationError: true,
              },
            })
          } else {
            await clientSideTblPatientDiagnosis.update({
              where: (record) =>
                record.clientSideUniqRowId === arFromClientSideTable[i].clientSideUniqRowId,
              data: {
                validationClass: '',
                vnRowStateInSession: '2457', // New -> Changed -> Requested save -> Send to server
                isValidationError: false,
              },
            })
          }
        }
        
        // if there are no records left then I need to add a empty. For goal read docs/forms.md/1.3
        // await clientSideTblPatientDiagnosis.fnSendToServer()
        setTimeout(() => this.isClickReviewed = false, 200);
      }
    },
  },
}
</script>

<style>
.unsaved-data {
  border-color: #e6a23c;
}
.unsaved-data textarea {
  border-color: #e6a23c;
}
.unsaved-data input {
  border-color: #e6a23c;
}
.validaionErrorExist .el-textarea__inner {
  border-color: #ff4949;
}
.validaionErrorExist .el-input__inner {
  border-color: #ff4949;
}
</style>
