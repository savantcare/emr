// Master doc is at reference implementation rem/cl/add-ct.vue. This file has doc unique to this ct
Code synced with ref implementation on 14th sept 2020
<template>
  <div>
    <el-form>
      <div v-if="cfGetOrmNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetOrmNewRowsInEditState" :key="ormRow.id">
          <el-col :span="20" :class="ormRow.validationClass">
            <el-select
              filterable
              :value="mfGetFldValue(ormRow.id, 'scientificName')"
              :class="mfGetCssClassName(ormRow.id)"
              placeholder="Select"
              @input="mfSetFldValueUsingCache($event, ormRow.id, 'scientificName')"
            >
              <el-option
                v-for="item in cfGetScrsMasterData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-button
              plain
              type="warning"
              style="float: right"
              @click="mfDeleteRowInOrm(ormRow.id)"
              >Remove</el-button
            >
          </el-col>
        </el-form-item>
      </div>
      <p v-else>{{ mfAddEmptyRowInOrm() }}</p>
      <el-form-item>
        <el-button type="primary" plain @click="mfOnSubmit">Submit</el-button>
        <el-button type="primary" plain @click="mfAddEmptyRowInOrm">Add more</el-button>
        <el-button type="warning" plain @click="mfOnResetForm">Reset form</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-if="cfGetOrmApiSendingStateRows.length > 0"
      :data="cfGetOrmApiSendingStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column prop="scientificName" label="Screening sending to server"></el-table-column>
    </el-table>

    <el-table
      v-if="cfGetOrmApiSuccessStateRows.length > 0"
      :data="cfGetOrmApiSuccessStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column prop="scientificName" label="Screening added this session"></el-table-column>
    </el-table>
    <el-table
      v-if="cfGetOrmApiErrorStateRows.length > 0"
      :data="cfGetOrmApiErrorStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column
        prop="scientificName"
        label="Error: Screening attempted but failed to save"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
import objOrm from '../db/vuex-orm/orm.js'
export default {
  data() {
    return {
      arScrMaster: [],
    }
  },
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
    cfGetScrsMasterData() {
      const arScrMasterInDropdown = []
      const dbScrMaster = this.arScrMaster
      const arScrsUsedByPatient = objOrm.fnGetValidUniqueUuidNotEmptyRows('scientificName')

      /**
       Q) Why we filtered the master list to display in the add screen dropdown

       Ans) The screening which is assigned to patient don't needed to reassing to patient
            for this we shows only the unused screen list in add screen drop-down
      */
      dbScrMaster.forEach((list) => {
        if (
          _.findIndex(arScrsUsedByPatient, function (item) {
            return item.scientificName === list.scientificName
          }) === -1
        ) {
          arScrMasterInDropdown.push({
            value: list.scientificName,
            label: list.scientificName,
          })
        }
      })

      return arScrMasterInDropdown
    },
  },
  async mounted() {
    /* Q) Why we are fetching data locally instead of using orm  

      Ans) The screening master data 'arScrMaster' is used only for add screening section 
      and there is no historical data. due to this we fetched the data direct form api to this template.
    */
    console.log('get master screen list')
    await axios.get(objOrm.apiUrl + '/getScrMasterList').then((response) => {
      response.data.forEach((item) => {
        this.arScrMaster.push(item)
      })
      console.log(this.arScrMaster)
    })
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
      if (this.$refs.scientificName) {
        const lastElement = this.$refs.scientificName.length
        console.log('setting focus of', lastElement - 1, 'length is', lastElement)
        this.$refs.scientificName[lastElement - 1].focus()
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
          /*
           At the time of sending data to server via api 
           also need to send the screen uuid as 'scrUUID' 
           which is required field in screen db 'scrAssignedToPts' table

           Note : we used lodash libery at line 73 for array traversing purpose. 
           e.g. _.findIndex( ...) at line 190
          */
          const scrIndex = _.findIndex(this.arScrMaster, function (item) {
            return item.scientificName === arFromOrm[i].scientificName
          })
          await objOrm.update({
            where: (record) => record.id === arFromOrm[i].id,
            data: {
              scrUUID: this.arScrMaster[scrIndex].uuid,
              validationClass: '',
              vnRowStateInSession: '2457', // New -> Changed -> Requested save -> Send to server
              isValidationError: false,
            },
          })
        }
      }
      await objOrm.fnSendToServer()
    },
  },
}
</script>

<style>
.unsaved-data {
  border: 1px solid #e6a23c;
}
.validaionErrorExist .el-textarea__inner {
  border-color: #ff4949;
}
</style>
