<!-- Reference implementation -->
<!-- For design see ptclient/cts/core/crud/forms.md -->
<template>
  <div>
    <!-- Goal: Show multiple add rows along with remove each row. At end A. Reset B. Add more C. Submit -->
    <el-form>
      <div v-if="cfGetOrmNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetOrmNewRowsInEditState" :key="ormRow.id">
          <!-- Prop explaination  Read prop explanation for span=4 on line 19 -->
          <el-col :span="20" :class="ormRow.validationClass">
            <el-input
              ref="phone number"
              :class="mfGetCssClassName(ormRow.id)"
              :autosize="{ minRows: 2, maxRows: 10 }"
              placeholder="Please enter the phoneNumber .."
              :value="mfGetFldValue(ormRow.id, 'phoneNumber')"
              @input="mfSetFldValueUsingCache($event, ormRow.id, 'phoneNumber')"
            ></el-input>
            <div v-if="ormRow.isValidationError" class="el-form-item__error">
              Please enter minimum 3 characters.
            </div>
          </el-col>
          <!-- Prop explaination
            Goal: Show remove button on the RHS of input area. Since element.io divides it into 24 columns. we are giving
            20 columns to input and 4 columns to remove button
          -->
          <el-col :span="4">
            <el-button
              plain
              type="warning"
              style="float: right;"
              @click="mfDeleteRowInOrm(ormRow.id)"
              >Remove</el-button
            >
          </el-col>
        </el-form-item>
      </div>
      <!-- If there are no edit state rows then create a empty row for faster data input -->
      <p v-else>{{ mfAddEmptyRowInOrm() }}</p>
      <el-form-item>
        <el-button type="primary" plain @click="mfOnSubmit">Submit</el-button>
        <el-button type="primary" plain @click="mfAddEmptyRowInOrm">Add more</el-button>
        <el-button type="warning" plain @click="mfOnResetForm">Reset form</el-button>
      </el-form-item>
    </el-form>
    <!-- Goal: Show data at the time of sending to server -->
    <el-table
      v-if="cfGetOrmApiSendingStateRows.length > 0"
      :data="cfGetOrmApiSendingStateRows"
      style="width: 100%; background: #f0f9eb;"
    >
      <el-table-column prop="phoneNumber" label="Phone Number sending to server"></el-table-column>
    </el-table>

    <!-- Goal: Show data saved successfuly this session -->
    <el-table
      v-if="cfGetOrmApiSuccessStateRows.length > 0"
      :data="cfGetOrmApiSuccessStateRows"
      style="width: 100%; background: #f0f9eb;"
    >
      <el-table-column prop="phoneNumber" label="Phone Number added this session"></el-table-column>
    </el-table>
    <!-- Goal: Show data of API that failed in this session -->
    <el-table
      v-if="cfGetOrmApiErrorStateRows.length > 0"
      :data="cfGetOrmApiErrorStateRows"
      style="width: 100%; background: #f0f9eb;"
    >
      <el-table-column
        prop="phoneNumber"
        label="Error: Phone Number attempted but failed to save"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import objOrm from '../db/vuex-orm/orm.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.

export default {
  computed: {
    // objOrm functions can not be directly called from template. hence computed functions have been defined.
    cfGetOrmNewRowsInEditState() {
      return objOrm.fnGetNewRowsInEditState()
    },
    cfGetOrmReadyToSubmitStateRows() {
      return objOrm.fnGetNewRowsInReadyToSubmitState()
    },
    cfGetOrmApiSuccessStateRows() {
      return objOrm.fnGetNewRowsInApiSuccessState()
    },
    cfGetOrmApiErrorStateRows() {
      return objOrm.fnGetNewRowsInApiErrorState()
    },
    cfGetOrmApiSendingStateRows() {
      return objOrm.fnGetNewRowsInApiSendingState()
    },
  },
  methods: {
    async mfAddEmptyRowInOrm() {
      // TODO: this should be part of base class
      const arFromOrm = await objOrm.insert({
        data: {
          vnRowStateInSession: 2, // For meaning of diff values read ptclient/cts/core/crud/forms.md
          ROW_START: Math.floor(Date.now() / 1000), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
        },
      })
      if (!arFromOrm) {
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
    // Cannot call objOrm function directly from template so need to have a method function to act as a pipe between template and the ORM function
    mfGetFldValue(pOrmRowId, pFldName) {
      return objOrm.fnGetFldValue(pOrmRowId, pFldName)
    },
    mfSetFldValueUsingCache(pEvent, pOrmRowId, pFldName) {
      const rowStatus = 24
      objOrm.fnSetFldValue(pEvent, pOrmRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/fnPutFldValueInCache
    },
    mfGetCssClassName(pOrmRowId) {
      const arFromOrm = objOrm.find(pOrmRowId)
      if (arFromOrm && arFromOrm.vnRowStateInSession === 24) {
        // New -> Changed
        return 'unsaved-data'
      }
      return ''
    },
    async mfDeleteRowInOrm(pOrmRowId) {
      await objOrm.delete(pOrmRowId)
      this.mfManageFocus()
    },
    mfOnResetForm(formName) {
      objOrm.fnDeleteNewRowsInEditState()
    },
    async mfOnSubmit() {
      /*
        Goal: If i submitted 4 records with a empty record at once. We need to run submit process on those records which is not empty.
        The computed function 'cfGetOrmReadyToSubmitStateRows' returns all the newly added row which is not empty from objOrm ie; 'vnRowStateInSession' = 24
      */
      const arFromOrm = this.cfGetOrmReadyToSubmitStateRows // calling cf instead of objOrm since get benefit of caching.
      if (arFromOrm.length) {
        console.log('unsaved data found', arFromOrm)
        for (let i = 0; i < arFromOrm.length; i++) {
          if (arFromOrm[i].phoneNumber.length < 3) {
            // Validation check
            await objOrm.update({
              where: (record) => record.id === arFromOrm[i].id,
              data: {
                validationClass: 'validaionErrorExist',
                vnRowStateInSession: '2456', // New -> Changed -> Requested save -> form error
                isValidationError: true,
              },
            })
          } else {
            await objOrm.update({
              where: (record) => record.id === arFromOrm[i].id,
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
      await objOrm.fnSendToServer()
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
