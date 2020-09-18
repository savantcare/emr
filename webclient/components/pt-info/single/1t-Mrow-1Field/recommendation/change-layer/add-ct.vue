<!-- Reference implementation -->
<!-- For design see webclient/cts/core/crud/forms.md -->
<template>
  <div>
    <!-- Goal: Show multiple add rows along with remove each row. At end A. Reset B. Add more C. Submit -->
    <el-form>
      <div v-if="cfGetOrmNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetOrmNewRowsInEditState" :key="ormRow.id">
          <!-- Prop explaination  Read prop explanation for span=4 on line 19 -->
          <el-col :span="20" :class="ormRow.validationClass">
            <el-input
              ref="description"
              type="textarea"
              :class="mfGetCssClassName(ormRow.id)"
              :autosize="{ minRows: 2, maxRows: 10 }"
              placeholder="Please enter the recommendation .."
              :value="mfGetFldValue(ormRow.id, 'description')"
              @input="mfSetFldValueUsingCache($event, ormRow.id, 'description')"
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
      <el-table-column
        prop="description"
        label="Recommendations sending to server"
      ></el-table-column>
    </el-table>

    <!-- Goal: Show data saved successfuly this session -->
    <el-table
      v-if="cfGetOrmApiSuccessStateRows.length > 0"
      :data="cfGetOrmApiSuccessStateRows"
      style="width: 100%; background: #f0f9eb;"
    >
      <el-table-column
        prop="description"
        label="Recommendations added this session"
      ></el-table-column>
    </el-table>
    <!-- Goal: Show data of API that failed in this session -->
    <el-table
      v-if="cfGetOrmApiErrorStateRows.length > 0"
      :data="cfGetOrmApiErrorStateRows"
      style="width: 100%; background: #f0f9eb;"
    >
      <el-table-column
        prop="description"
        label="Error: Recommendations attempted but failed to save"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import objOrm from '../db/client-side/structure/rec-table.js'

export default {
  computed: {
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
      const arFromOrm = await objOrm.insert({
        data: {
          vnRowStateInSession: 2,
          ROW_START: Math.floor(Date.now() / 1000),
        },
      })
      if (!arFromOrm) {
        console.log('FATAL ERROR')
      }
      this.mfManageFocus()
    },
    mfManageFocus() {
      console.log(this.$refs)
      if (this.$refs.description) {
        const lastElement = this.$refs.description.length
        console.log('setting focus of', lastElement - 1, 'length is', lastElement)
        this.$refs.description[lastElement - 1].focus()
      }
    },
    mfGetFldValue(pOrmRowId, pFldName) {
      return objOrm.fnGetFldValue(pOrmRowId, pFldName)
    },
    mfSetFldValueUsingCache(pEvent, pOrmRowId, pFldName) {
      const rowStatus = 24
      objOrm.fnSetFldValue(pEvent, pOrmRowId, pFldName, rowStatus)
      this.$forceUpdate()
    },
    mfGetCssClassName(pOrmRowId) {
      const arFromOrm = objOrm.find(pOrmRowId)
      if (arFromOrm && arFromOrm.vnRowStateInSession === 24) {
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
      const arFromOrm = this.cfGetOrmReadyToSubmitStateRows
      if (arFromOrm.length) {
        console.log('unsaved data found', arFromOrm)
        for (let i = 0; i < arFromOrm.length; i++) {
          if (arFromOrm[i].description.length < 3) {
            await objOrm.update({
              where: (record) => record.id === arFromOrm[i].id,
              data: {
                validationClass: 'validaionErrorExist',
                vnRowStateInSession: '2456',
                isValidationError: true,
              },
            })
          } else {
            await objOrm.update({
              where: (record) => record.id === arFromOrm[i].id,
              data: {
                validationClass: '',
                vnRowStateInSession: '2457',
                isValidationError: false,
              },
            })
          }
        }
      }
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
