<template>
  <div>
    <el-form>
      <div v-if="cfGetOrmNewRowsInEditState.length">
        <el-form-item
          v-for="ormRow in cfGetOrmNewRowsInEditState"
          :key="ormRow.clientSideUniqRowId"
        >
          <el-col :span="20" :class="ormRow.validationClass">
            <el-select
              :value="mfGetClientSideTblPatientScreeningName(ormRow.clientSideUniqRowId, 'scrUUID')"
              :class="mfGetCssClassName(ormRow.clientSideUniqRowId)"
              placeholder="Please select"
              @input="mfUpdateClientSideTblPatientScreening($event, ormRow.clientSideUniqRowId, 'scrUUID')"
            >
              <el-option
                v-for="item in cfGetScrsMasterDataList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-button
              plain
              type="warning"
              style="float: right"
              @click="mfDeleteRowInOrm(ormRow.clientSideUniqRowId)"
            >Remove</el-button>
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
      <el-table-column prop="tblScrMasterData.scientificName" label="Screening sending to server"></el-table-column>
    </el-table>

    <el-table
      v-if="cfGetOrmApiSuccessStateRows.length > 0"
      :data="cfGetOrmApiSuccessStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column prop="tblScrMasterData.scientificName" label="Screening added this session"></el-table-column>
    </el-table>
    <el-table
      v-if="cfGetOrmApiErrorStateRows.length > 0"
      :data="cfGetOrmApiErrorStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column
        prop="tblScrMasterData.scientificName"
        label="Error: Screening attempted but failed to save"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import _ from 'lodash'
import ClientSideTblMasterScreening from '../db/client-side/structure/scr-table-master'
import ClientSideTblPatientScreening from '../db/client-side/structure/scr-table-patient.js'

export default {
  computed: {
    cfGetOrmNewRowsInEditState() {
      const arFromClientSideTable = ClientSideTblPatientScreening.query()
        .with('tblScrMasterData')
        .where('vnRowStateInSession', 2) // New
        .orWhere('vnRowStateInSession', 24) // New -> Changed
        .orWhere('vnRowStateInSession', 2456) // New -> Changed -> Requested save -> form error
        .get()
      return arFromClientSideTable
    },
    cfGetOrmReadyToSubmitStateRows() {
      const arFromClientSideTable = ClientSideTblPatientScreening.query()
        .with('tblScrMasterData')
        .where('vnRowStateInSession', 24) // New -> Changed
        .get()
      return arFromClientSideTable
    },
    cfGetOrmApiSuccessStateRows() {
      const arFromClientSideTable = ClientSideTblPatientScreening.query()
        .with('tblScrMasterData')
        .where('vnRowStateInSession', 24571)
        .get()
      return arFromClientSideTable
    },
    cfGetOrmApiErrorStateRows() {
      const arFromClientSideTable = ClientSideTblPatientScreening.query()
        .with('tblScrMasterData')
        .where('vnRowStateInSession', 24578)
        .get()
      return arFromClientSideTable
    },
    cfGetOrmApiSendingStateRows() {
      const arFromClientSideTable = ClientSideTblPatientScreening.query()
        .with('tblScrMasterData')
        .where('vnRowStateInSession', 2457)
        .get()
      return arFromClientSideTable
    },
    cfGetScrsMasterDataList() {
      const arScrMasterDataInDropdown = []
      const arFromClientSideMasterTable = ClientSideTblMasterScreening.all()

      const arScrsUsedByPatient = ClientSideTblPatientScreening.query()
        .with('tblScrMasterData')
        .where('ROW_END', 2147483647.999999)
        .get()

      /**
       Q) Why we filtered the master list to display in the add screen dropdown

       Ans) The screening which is assigned to patient don't needed to reassing to patient
            for this we shows only the unused screen list in add screen drop-down
      */
      arFromClientSideMasterTable.forEach((list) => {
        if (
          _.findIndex(arScrsUsedByPatient, function (item) {
            return item.scrUUID == list.scrUUID
          }) === -1
        ) {
          arScrMasterDataInDropdown.push({
            value: list.scrUUID,
            label: list.scientificName,
          })
        }
      })

      return arScrMasterDataInDropdown
    },
  },
  methods: {
    async mfAddEmptyRowInOrm() {
      const arFromOrm = await ClientSideTblPatientScreening.insert({
        data: {
          vnRowStateInSession: 2,
          ROW_START: Math.floor(Date.now() / 1000),
        },
      })
      if (!arFromOrm) {
        console.log('FATAL ERROR')
      }
    },
    mfGetClientSideTblPatientScreeningName(pOrmRowId, pFldName) {
      const exists = ClientSideTblPatientScreening.query()
        .with('tblScrMasterData')
        .where('clientSideUniqRowId', pOrmRowId)
        .where('ROW_END', 2147483647.999999)
        .get()

      if (exists.length > 0 && exists[0].tblScrMasterData !== null) {
        return exists[0].tblScrMasterData[pFldName]
      } else {
        return ''
      }
    },
    mfUpdateClientSideTblPatientScreening(pEvent, pOrmRowId, pFldName) {
      const exists = ClientSideTblPatientScreening.query()
        .where('clientSideUniqRowId', pOrmRowId)
        .where('ROW_END', 2147483647.999999)
        .get()
      if (exists.length > 0) {
        ClientSideTblPatientScreening.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            scrUUID: pEvent,
            vnRowStateInSession: 24,
          },
        })
      }
    },
    mfGetCssClassName(pOrmRowId) {
      const arFromOrm = ClientSideTblPatientScreening.find(pOrmRowId)
      console.log(arFromOrm)
      if (arFromOrm && arFromOrm.vnRowStateInSession === 24) {
        return 'unsaved-data'
      }
      return ''
    },
    async mfDeleteRowInOrm(pOrmRowId) {
      await ClientSideTblPatientScreening.delete(pOrmRowId)
    },
    mfOnResetForm(formName) {
      ClientSideTblPatientScreening.fnDeleteNewRowsInEditState()
    },
    async mfOnSubmit() {
      const arFromOrm = this.cfGetOrmReadyToSubmitStateRows
      if (arFromOrm.length) {
        console.log('unsaved data found', arFromOrm)
        for (let i = 0; i < arFromOrm.length; i++) {
          await ClientSideTblPatientScreening.update({
            where: (record) => record.clientSideUniqRowId === arFromOrm[i].clientSideUniqRowId,
            data: {
              validationClass: '',
              vnRowStateInSession: '2457', // New -> Changed -> Requested save -> Send to server
              isValidationError: false,
            },
          })
        }
      }
      await ClientSideTblPatientScreening.fnSendToServer()
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
