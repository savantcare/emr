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
              ref="remDesc"
              type="textarea"
              :class="mfGetCssClassName(ormRow.id)"
              :autosize="{ minRows: 2, maxRows: 10 }"
              placeholder="Please enter the reminder .."
              :value="mfGetFieldValue(ormRow.id, 'remDesc')"
              @input="mfSetFieldValueUsingCache($event, ormRow.id, 'remDesc')"
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
        <el-button type="warning" plain @click="mfResetForm">Reset form</el-button>
      </el-form-item>
    </el-form>
    <!-- Goal: Show data at the time of sending to server -->
    <el-table
      v-if="cfGetOrmApiSendingStateRows.length > 0"
      :data="cfGetOrmApiSendingStateRows"
      style="width: 100%; background: #f0f9eb;"
    >
      <el-table-column prop="remDesc" label="Reminders sending to server"></el-table-column>
    </el-table>

    <!-- Goal: Show data saved successfuly this session -->
    <el-table
      v-if="cfGetOrmApiSuccessStateRows.length > 0"
      :data="cfGetOrmApiSuccessStateRows"
      style="width: 100%; background: #f0f9eb;"
    >
      <el-table-column prop="remDesc" label="Reminders added this session"></el-table-column>
    </el-table>
    <!-- Goal: Show data of API that failed in this session -->
    <el-table
      v-if="cfGetOrmApiErrorStateRows.length > 0"
      :data="cfGetOrmApiErrorStateRows"
      style="width: 100%; background: #f0f9eb;"
    >
      <el-table-column
        prop="remDesc"
        label="Error: Reminders attempted but failed to save"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import ormRem from '../db/vuex-orm/rem.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.

export default {
  data() {
    return {}
  },

  computed: {
    cfGetOrmNewRowsInEditState() {
      return ormRem.getNewRowsInEditState()
    },
    cfGetOrmReadyToSubmitStateRows() {
      return ormRem.getNewRowsInReadyToSubmitState()
    },
    cfGetOrmApiSuccessStateRows() {
      return ormRem.getApiSuccessStateRows()
    },
    cfGetOrmApiErrorStateRows() {
      return ormRem.getApiErrorStateRows()
    },
    cfGetOrmApiSendingStateRows() {
      return ormRem.getApiSendingStateRows()
    },
  },

  mounted() {},

  methods: {
    async mfAddEmptyRowInOrm() {
      const arFromORM = await ormRem.insert({
        data: {
          remDesc: '',
          vnRowStateInSession: 2, // For meaning of diff values read ptclient/cts/core/crud/forms.md
          ROW_START: Math.floor(Date.now() / 1000), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
        },
      })
      if (!arFromORM) {
        console.log('FATAL ERROR')
      }
      this.mfManageFocus()
    },
    mfManageFocus() {
      // Ref: https://stackoverflow.com/questions/60291308/vue-js-this-refs-empty-due-to-v-if
      console.log(this.$refs)
      if (this.$refs.remDesc) {
        const lastElement = this.$refs.remDesc.length
        console.log('setting focus of', lastElement - 1, 'length is', lastElement)
        this.$refs.remDesc[lastElement - 1].focus()
      }
    },
    // Cannot call orm function directly from template so need to have a method function to act as a pipe between template and the ORM function
    mfGetFieldValue(pOrmRowId, pFieldName) {
      return ormRem.getFieldValue(pOrmRowId, pFieldName)
    },
    mfSetFieldValueUsingCache(pEvent, pOrmRowId, pFieldName) {
      const rowStatus = 24
      ormRem.setFieldValue(pEvent, pOrmRowId, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
    mfGetCssClassName(pOrmRowId) {
      const arFromORM = ormRem.find(pOrmRowId)
      if (arFromORM && arFromORM.vnRowStateInSession === 24) {
        // New -> Changed
        return 'unsaved-data'
      }
      return ''
    },
    async mfDeleteRowInOrm(pOrmRowId) {
      await ormRem.delete(pOrmRowId)
      this.mfManageFocus()
    },
    mfResetForm(formName) {
      ormRem.deleteNewRowsInEditState()
    },
    async mfOnSubmit() {
      /*
        Goal: If i submitted 4 records with a empty record at once. We need to run submit process on those records which is not empty.
        The computed function 'cfGetOrmReadyToSubmitStateRows' returns all the newly added row which is not empty from ormRem ie; 'vnRowStateInSession' = 24
      */
      const arFromORM = this.cfGetOrmReadyToSubmitStateRows
      if (arFromORM.length) {
        console.log('unsaved data found', arFromORM)
        for (let i = 0; i < arFromORM.length; i++) {
          if (arFromORM[i].remDesc.length < 3) {
            // Validation check
            await ormRem.update({
              where: (record) => record.id === arFromORM[i].id,
              data: {
                validationClass: 'validaionErrorExist',
                vnRowStateInSession: '2456', // New -> Changed -> Requested save -> form error
                isValidationError: true,
              },
            })
          } else {
            await ormRem.update({
              where: (record) => record.id === arFromORM[i].id,
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
      await ormRem.sendToServer()
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
