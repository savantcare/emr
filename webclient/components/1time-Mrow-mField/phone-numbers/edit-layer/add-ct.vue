<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <div>
    <!-- Goal: Show multiple add rows along with remove each row. At end A. Reset B. Add more C. Reviewed -->
    <el-form>
      <div v-if="cfGetClientSideTableNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetClientSideTableNewRowsInEditState" :key="ormRow.id">
          <!-- Prop explaination  Read prop explanation for span=4 on line 19 -->
          <el-col :span="10" :class="ormRow.validationClass">
            <el-input
              ref="phone number"
              :class="mfGetCssClassNameForEachDataRow(ormRow.id)"
              :autosize="{ minRows: 2, maxRows: 10 }"
              placeholder="Please enter the phoneNumber .."
              :value="mfGetFldValue(ormRow.id, 'phoneNumber')"
              @input="mfSetFldValueUsingCache($event, ormRow.id, 'phoneNumber')"
            ></el-input>

            <div v-if="ormRow.isValidationError" class="el-form-item__error">Please enter minimum 3 characters.</div>
          </el-col>

          <el-col :span="10" :class="ormRow.validationClass">
            <el-input
              ref="country code"
              :class="mfGetCssClassNameForEachDataRow(ormRow.id)"
              :autosize="{ minRows: 2, maxRows: 10 }"
              placeholder="Please enter the country code .."
              :value="mfGetFldValue(ormRow.id, 'countryCode')"
              @input="mfSetFldValueUsingCache($event, ormRow.id, 'countryCode')"
            ></el-input>
          </el-col>
          <!-- Prop explaination
            Goal: Show remove button on the RHS of input area. Since element.io divides it into 24 columns. we are giving
            20 columns to input and 4 columns to remove button
          -->
          <el-col :span="4">
            <el-button plain type="warning" style="float: right" @click="mfDeleteRowInEditLayerientSideTable(ormRow.id)"
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
      <el-table-column prop="phoneNumber" label="Phone Number sending to server"></el-table-column>
    </el-table>

    <!-- Goal: Show data saved successfuly this session -->
    <el-table
      v-if="cfGetClientSideTableApiSuccessStateRows.length > 0"
      :data="cfGetClientSideTableApiSuccessStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column prop="phoneNumber" label="Phone Number added this session"></el-table-column>
    </el-table>
    <!-- Goal: Show data of API that failed in this session -->
    <el-table
      v-if="cfGetClientSideTableApiErrorStateRows.length > 0"
      :data="cfGetClientSideTableApiErrorStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column prop="phoneNumber" label="Error: Phone Number attempted but failed to save"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import clientTbl from '../db/client-side/structure/table.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.

export default {
  computed: {
    // clientTbl functions can not be directly called from template. hence computed functions have been defined.
    cfGetClientSideTableNewRowsInEditState() {
      return clientTbl.fnGetNewRowsInEditState()
    },
    cfGetClientSideTableReadyToReviewedStateRows() {
      return clientTbl.fnGetNewRowsInReadyToReviewedState()
    },
    cfGetClientSideTableApiSuccessStateRows() {
      return clientTbl.fnGetNewRowsInApiSuccessState()
    },
    cfGetClientSideTableApiErrorStateRows() {
      return clientTbl.fnGetNewRowsInApiErrorState()
    },
    cfGetClientSideTableApiSendingStateRows() {
      return clientTbl.fnGetNewRowsInApiSendingState()
    },
  },
  methods: {
    async mfAddEmptyRowInEditLayerientSideTable() {
      // TODO: this should be part of base class
      const arFromClientSideTable = await clientTbl.insert({
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
      if (this.$refs.phoneNumber) {
        const lastElement = this.$refs.phoneNumber.length
        console.log('setting focus of', lastElement - 1, 'length is', lastElement)
        this.$refs.phoneNumber[lastElement - 1].focus()
      }
    },
    // Cannot call clientTbl function directly from template so need to have a method function to act as a pipe between template and the ORM function
    mfGetFldValue(pClientSideRowId, pFldName) {
      return clientTbl.fnGetFldValue(pClientSideRowId, pFldName)
    },
    mfSetFldValueUsingCache(pEvent, pClientSideRowId, pFldName) {
      const rowStatus = 24
      clientTbl.fnSetFldValue(pEvent, pClientSideRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    mfGetCssClassNameForEachDataRow(pClientSideRowId) {
      const arFromClientSideTable = clientTbl.find(pClientSideRowId)
      if (arFromClientSideTable && arFromClientSideTable.vnRowStateInSession === 24) {
        // New -> Changed
        return 'unsaved-data'
      }
      return ''
    },
    async mfDeleteRowInEditLayerientSideTable(pClientSideRowId) {
      await clientTbl.delete(pClientSideRowId)
      this.mfManageFocus()
    },
    mfOnResetForm(formName) {
      clientTbl.fnDeleteNewRowsInEditState()
    },
    async mfOnReviewed() {
      /*
        Goal: If i submitted 4 records with a empty record at once. We need to run submit process on those records which is not empty.
        The computed function 'cfGetClientSideTableReadyToReviewedStateRows' returns all the newly added row which is not empty from clientTbl ie; 'vnRowStateInSession' = 24
      */
      const arFromClientSideTable = this.cfGetClientSideTableReadyToReviewedStateRows // calling cf instead of clientTbl since get benefit of caching.
      if (arFromClientSideTable.length) {
        console.log('unsaved data found', arFromClientSideTable)
        for (let i = 0; i < arFromClientSideTable.length; i++) {
          if (arFromClientSideTable[i].phoneNumber.length < 3) {
            // Validation check
            await clientTbl.update({
              where: (record) => record.id === arFromClientSideTable[i].clientSideUniqRowId,
              data: {
                validationClass: 'validaionErrorExist',
                vnRowStateInSession: '2456', // New -> Changed -> Requested save -> form error
                isValidationError: true,
              },
            })
          } else {
            await clientTbl.update({
              where: (record) => record.id === arFromClientSideTable[i].clientSideUniqRowId,
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
      await clientTbl.fnSendToServer()
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
