<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <div>
    <!-- Goal: Show multiple add rows along with remove each row. At end A. Reset B. Add more C. Reviewed -->
    <el-form>
      <div v-if="cfGetClientSideTableNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetClientSideTableNewRowsInEditState" :key="ormRow.clientSideUniqRowId">
          <!-- Prop explaination  Read prop explanation for span=4 on line 19 -->

          <ul>
            <div v-for="(propFieldObj, id) in propFormFields" :key="id">
              <el-col :span="propFieldObj.span" :class="ormRow.validationClass">
                <el-input
                  :ref="propFieldObj.fieldName"
                  :type="propFieldObj.fieldType"
                  :class="mfGetCssClassNameForEachDataRow(ormRow.clientSideUniqRowId)"
                  :autosize="{ minRows: 2, maxRows: 10 }"
                  :placeholder="propFieldObj.fieldName.charAt(0).toUpperCase() + propFieldObj.fieldName.slice(1)"
                  :value="mfGetFldValue(ormRow.clientSideUniqRowId, propFieldObj.fieldName)"
                  @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldObj.fieldName)"
                ></el-input>
                <div v-if="ormRow.isValidationError" class="el-form-item__error">
                  Please enter minimum 3 characters.
                </div>
              </el-col>
            </div>
          </ul>

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
      v-if="cfGetClientSideTableApiSendingStateRows.length > 0"
      :data="cfGetClientSideTableApiSendingStateRows"
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
      v-if="cfGetClientSideTableApiSuccessStateRows.length > 0"
      :data="cfGetClientSideTableApiSuccessStateRows"
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
      v-if="cfGetClientSideTableApiErrorStateRows.length > 0"
      :data="cfGetClientSideTableApiErrorStateRows"
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
import allergiesClientSideTable from '@/components/1time-eachField-multiValues/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import familyHistoryClientSideTable from '@/components/1time-eachField-multiValues/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
import miscNotesClientSideTable from '@/components/1time-eachField-multiValues/misc-notes/db/client-side/structure/misc-notes-of-a-patient-table.js'
import planCommentsClientSideTable from '@/components/1time-eachField-multiValues/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import processNotesClientSideTable from '@/components/1time-eachField-multiValues/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
import recommendationClientSideTable from '@/components/1time-eachField-multiValues/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import reminderClientSideTable from '@/components/1time-eachField-multiValues/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

// defining all rows in this object
const clientSideTable = {
  reminders: reminderClientSideTable,
  recommendations: recommendationClientSideTable,
  plan_comments: planCommentsClientSideTable,
  misc_notes: miscNotesClientSideTable,
  process_notes: processNotesClientSideTable,
  family_history: familyHistoryClientSideTable,
  allergies: allergiesClientSideTable,
} // 1st row

export default {
  created() {},
  props: {
    propComponentName: {
      type: String,
      required: true,
      validator: (value) => Object.keys(clientSideTable).includes(value),
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
    // clientSideTable[this.propComponentName] functions can not be directly called from template. hence computed functions have been defined.
    cfGetClientSideTableNewRowsInEditState() {
      return clientSideTable[this.propComponentName].fnGetNewRowsInEditState()
    },
    cfGetClientSideTableReadyToReviewedStateRows() {
      return clientSideTable[this.propComponentName].fnGetNewRowsInReadyToReviewedState()
    },
    cfGetClientSideTableApiSuccessStateRows() {
      return clientSideTable[this.propComponentName].fnGetNewRowsInApiSuccessState()
    },
    cfGetClientSideTableApiErrorStateRows() {
      return clientSideTable[this.propComponentName].fnGetNewRowsInApiErrorState()
    },
    cfGetClientSideTableApiSendingStateRows() {
      return clientSideTable[this.propComponentName].fnGetNewRowsInApiSendingState()
    },
  },
  methods: {
    async mfAddEmptyRowInEditLayerientSideTable() {
      console.log(this.propFormFields)
      // TODO: this should be part of base class
      const arFromClientSideTable = await clientSideTable[this.propComponentName].insert({
        data: {
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
      console.log(this.$refs)
      if (this.$refs.description) {
        const lastElement = this.$refs.description.length
        console.log('setting focus of', lastElement - 1, 'length is', lastElement)
        this.$refs.description[lastElement - 1].focus()
      }
    },
    // Cannot call clientSideTable[this.propComponentName] function directly from template so need to have a method function to act as a pipe between template and the ORM function
    mfGetFldValue(pClientSideRowId, pFldName) {
      return clientSideTable[this.propComponentName].fnGetFldValue(pClientSideRowId, pFldName)
    },
    mfSetFldValueUsingCache(pEvent, pClientSideRowId, pFldName) {
      const rowStatus = 24
      clientSideTable[this.propComponentName].fnSetFldValue(pEvent, pClientSideRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    mfGetCssClassNameForEachDataRow(pClientSideRowId) {
      const arFromClientSideTable = clientSideTable[this.propComponentName].find(pClientSideRowId)
      if (arFromClientSideTable && arFromClientSideTable.vnRowStateInSession === 24) {
        // New -> Changed
        return 'unsaved-data'
      }
      return ''
    },
    async mfDeleteRowInEditLayerientSideTable(pClientSideRowId) {
      await clientSideTable[this.propComponentName].delete(pClientSideRowId)
      this.mfManageFocus()
    },
    mfOnResetForm(formName) {
      clientSideTable[this.propComponentName].fnDeleteNewRowsInEditState()
    },
    async mfOnReviewed() {
      /*
        Goal: If i submitted 4 records with a empty record at once. We need to run submit process on those records which is not empty.
        The computed function 'cfGetClientSideTableReadyToReviewedStateRows' returns all the newly added row which is not empty from clientSideTable[this.propComponentName] ie; 'vnRowStateInSession' = 24
      */
      const arFromClientSideTable = this.cfGetClientSideTableReadyToReviewedStateRows // calling cf instead of clientSideTable[this.propComponentName] since get benefit of caching.
      if (arFromClientSideTable.length) {
        console.log('unsaved data found', arFromClientSideTable)
        for (let i = 0; i < arFromClientSideTable.length; i++) {
          if (arFromClientSideTable[i].description.length < 3) {
            // Validation check
            await clientSideTable[this.propComponentName].update({
              where: (record) => record.clientSideUniqRowId === arFromClientSideTable[i].clientSideUniqRowId,
              data: {
                validationClass: 'validaionErrorExist',
                vnRowStateInSession: '2456', // New -> Changed -> Requested save -> form error
                isValidationError: true,
              },
            })
          } else {
            await clientSideTable[this.propComponentName].update({
              where: (record) => record.clientSideUniqRowId === arFromClientSideTable[i].clientSideUniqRowId,
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
      await clientSideTable[this.propComponentName].fnSendToServer()
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
