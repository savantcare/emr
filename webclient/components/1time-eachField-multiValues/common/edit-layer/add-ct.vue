<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <div>
    <!-- Goal: Show multiple add rows along with remove each row. At end A. Reset B. Add more C. Reviewed -->
    <el-form>
      <div v-if="cfGetClientTblNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetClientTblNewRowsInEditState" :key="ormRow.clientSideUniqRowId">
          <!-- Prop explaination  Read prop explanation for span=4 on line 19 -->

          <div v-for="(propFieldObj, id) in propFormFields" :key="id">
            <el-col :span="propFieldObj.span" :class="ormRow.validationClass">
              <!-- There are 2 possibilities input type field or select type field -->
              <div v-if="propFieldObj.fieldType === 'select'">
                <el-select v-model="value" filterable placeholder="Name of diagnosis">
                  <el-option
                    v-for="item in propFieldObj.selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <el-input
                v-else
                :ref="propFieldObj.fieldName"
                :type="propFieldObj.fieldType"
                :class="mfGetCssClassNameForEachDataRow(ormRow.clientSideUniqRowId)"
                :autosize="{ minRows: 2, maxRows: 10 }"
                :placeholder="propFieldObj.fieldName.charAt(0).toUpperCase() + propFieldObj.fieldName.slice(1)"
                :value="mfGetFldValue(ormRow.clientSideUniqRowId, propFieldObj.fieldName)"
                @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldObj.fieldName)"
              ></el-input>
              <div v-if="ormRow.isValidationError" class="el-form-item__error">Please enter minimum 3 characters.</div>
            </el-col>
          </div>

          <!-- Prop explaination
            Goal: Show remove button on the RHS of input area. Since element.io divides it into 24 columns. we are giving
            20 columns to input and 4 columns to remove button
          -->
          <el-col :span="4">
            <el-button
              plain
              type="warning"
              style="float: right"
              @click="mfDeleteRowInEditLayerientSideTable(ormRow.clientSideUniqRowId)"
              >Remove</el-button
            >
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
      v-if="cfGetClientTblApiSendingStateRows.length > 0"
      :data="cfGetClientTblApiSendingStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column label="Sending to server">
        <div v-for="(propFieldObj, id) in propFormFields" :key="id">
          <el-table-column :prop="propFieldObj.fieldName" :label="propFieldObj.fieldName"></el-table-column>
        </div>
      </el-table-column>
    </el-table>

    <!-- Goal: Show data saved successfuly this session -->

    <el-table
      v-if="cfGetClientTblApiSuccessStateRows.length > 0"
      :data="cfGetClientTblApiSuccessStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column align="center" label="Addded this session">
        <div v-for="(propFieldObj, id) in propFormFields" :key="id">
          <el-table-column
            :prop="propFieldObj.fieldName"
            :label="propFieldObj.fieldName.charAt(0).toUpperCase() + propFieldObj.fieldName.slice(1)"
          ></el-table-column>
        </div>
      </el-table-column>
    </el-table>
    <!-- Goal: Show data of API that failed in this session -->
    <el-table
      v-if="cfGetClientTblApiErrorStateRows.length > 0"
      :data="cfGetClientTblApiErrorStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column label="Attempted but failed to save">
        <div v-for="(propFieldObj, id) in propFormFields" :key="id">
          <el-table-column prop="propFieldObj.fieldName" label="Attempted but failed to save"></el-table-column>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import allergiesClientTbl from '@/components/1time-eachField-multiValues/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import familyHistoryClientTbl from '@/components/1time-eachField-multiValues/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
import miscNotesClientTbl from '@/components/1time-eachField-multiValues/misc-notes/db/client-side/structure/misc-notes-of-a-patient-table.js'
import planCommentsClientTbl from '@/components/1time-eachField-multiValues/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import processNotesClientTbl from '@/components/1time-eachField-multiValues/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
import recommendationClientTbl from '@/components/1time-eachField-multiValues/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import reminderClientTbl from '@/components/1time-eachField-multiValues/reminders/db/client-side/structure/reminders-of-a-patient-table.js'
import diagnosisClientTbl from '@/components/1time-eachField-multiValues/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'

// defining all rows in this object
const clientTbl = {
  allergies: allergiesClientTbl,
  family_history: familyHistoryClientTbl,
  misc_notes: miscNotesClientTbl,
  plan_comments: planCommentsClientTbl,
  process_notes: processNotesClientTbl,
  recommendations: recommendationClientTbl,
  reminders: reminderClientTbl,
  diagnosis: diagnosisClientTbl,
} // 1st row

export default {
  created() {},
  props: {
    propComponentName: {
      type: String,
      required: true,
      validator: (value) => Object.keys(clientTbl).includes(value),
    },
    propFormFields: {
      type: Array,
      required: true,
    },
    propReferToComponentInUiAtPluralClassification: {
      type: String,
    },
  },
  computed: {
    // clientTbl[this.propComponentName] functions can not be directly called from template. hence computed functions have been defined.
    cfGetClientTblNewRowsInEditState() {
      return clientTbl[this.propComponentName].fnGetNewRowsInEditState()
    },
    cfGetClientTblReadyToReviewedStateRows() {
      return clientTbl[this.propComponentName].fnGetNewRowsInReadyToReviewedState()
    },
    cfGetClientTblApiSuccessStateRows() {
      return clientTbl[this.propComponentName].fnGetNewRowsInApiSuccessState()
    },
    cfGetClientTblApiErrorStateRows() {
      return clientTbl[this.propComponentName].fnGetNewRowsInApiErrorState()
    },
    cfGetClientTblApiSendingStateRows() {
      return clientTbl[this.propComponentName].fnGetNewRowsInApiSendingState()
    },
  },
  methods: {
    async mfAddEmptyRowInEditLayerientSideTable() {
      console.log(this.propFormFields)
      // TODO: this should be part of base class
      const arFromClientTbl = await clientTbl[this.propComponentName].insert({
        data: {
          vnRowStateInSession: 2, // For meaning of diff values read webclient/cts/non-temporal/crud/forms.md
          ROW_START: Math.floor(Date.now()), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
        },
      })
      if (!arFromClientTbl) {
        console.log('FATAL ERROR')
      }
      this.mfManageFocus()
    },
    mfManageFocus() {
      // Ref: https://stackoverflow.com/questions/60291308/vue-js-this-refs-empty-due-to-v-if
      console.log(this.$refs)
      if (this.$refs.description) {
        const lastElement = this.$refs.description.length
        console.log('setting focus of', lastElement - 1, 'length is', lastElement)
        this.$refs.description[lastElement - 1].focus()
      }
    },
    // Cannot call clientTbl[this.propComponentName] function directly from template so need to have a method function to act as a pipe between template and the ORM function
    mfGetFldValue(pClientRowId, pFldName) {
      return clientTbl[this.propComponentName].fnGetFldValue(pClientRowId, pFldName)
    },
    mfSetFldValueUsingCache(pEvent, pClientRowId, pFldName) {
      const rowStatus = 24
      clientTbl[this.propComponentName].fnSetFldValue(pEvent, pClientRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    mfGetCssClassNameForEachDataRow(pClientRowId) {
      const arFromClientTbl = clientTbl[this.propComponentName].find(pClientRowId)
      if (arFromClientTbl && arFromClientTbl.vnRowStateInSession === 24) {
        // New -> Changed
        return 'unsaved-data'
      }
      return ''
    },
    async mfDeleteRowInEditLayerientSideTable(pClientRowId) {
      await clientTbl[this.propComponentName].delete(pClientRowId)
      this.mfManageFocus()
    },
    mfOnResetForm(formName) {
      clientTbl[this.propComponentName].fnDeleteNewRowsInEditState()
    },
    async mfOnReviewed() {
      /*
        Goal: If i submitted 4 records with a empty record at once. We need to run submit process on those records which is not empty.
        The computed function 'cfGetClientTblReadyToReviewedStateRows' returns all the newly added row which is not empty from clientTbl[this.propComponentName] ie; 'vnRowStateInSession' = 24
      */
      const arFromClientTbl = this.cfGetClientTblReadyToReviewedStateRows // calling cf instead of clientTbl[this.propComponentName] since get benefit of caching.
      if (arFromClientTbl.length) {
        console.log('unsaved data found', arFromClientTbl)
        for (let i = 0; i < arFromClientTbl.length; i++) {
          if (arFromClientTbl[i].description.length < 3) {
            // Validation check
            await clientTbl[this.propComponentName].update({
              where: (record) => record.clientSideUniqRowId === arFromClientTbl[i].clientSideUniqRowId,
              data: {
                validationClass: 'validaionErrorExist',
                vnRowStateInSession: '2456', // New -> Changed -> Requested save -> form error
                isValidationError: true,
              },
            })
          } else {
            await clientTbl[this.propComponentName].update({
              where: (record) => record.clientSideUniqRowId === arFromClientTbl[i].clientSideUniqRowId,
              data: {
                validationClass: '',
                vnRowStateInSession: '2457', // New -> Changed -> Requested save -> Send to server
                isValidationError: false,
              },
            })
          }
        }
      }
      // if there are no records left then I need to add a empty. For goal read docs/forms.md/1.3
      await clientTbl[this.propComponentName].fnSendToServer()
    },
  },
}
</script>

<style>
.unsaved-data textarea {
  border-color: #e6a23c;
}
.validaionErrorExist .el-textarea__inner {
  border-color: #ff4949;
}
</style>
