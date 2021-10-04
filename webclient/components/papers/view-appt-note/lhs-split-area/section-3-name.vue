<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div class="patient-name-section" style="color: #303133; display:inline-block;">
    <template v-if="cfLatestDataRowFromClientTbl">
      <div @click="heading_clicked_so_set_up_state('name')">
        {{ initialFirstName }} {{ initialMiddleName }} {{ initialLastName }} 
      </div>
      <!--<i @click="heading_clicked_so_set_up_state('name')" style="position: absolute;display: none;margin-left: 9px;" class="el-icon-edit" ></i>-->
    </template>
  </div>
</template>

<script>
import clientTbl from '@/components/patient-data/name/db/client-side/structure/name-of-a-patient-table.js'
import commonForAllCts from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
    date: {
      ctName: 'name',
    },
  },
  computed: {
    cfLatestDataRowFromClientTbl() {
      let arOfObjectsFromClientDB = clientTbl.query().where('ROW_END', 2147483648000).last()
      return arOfObjectsFromClientDB
    },
    initialFirstName() {
      // console.log(this.cfLatestDataRowFromClientTbl.middleName)
      if (this.cfLatestDataRowFromClientTbl.firstName) {
        return this.cfLatestDataRowFromClientTbl.firstName
      } else {
        return ''
      }
    },
    initialMiddleName() {
      // console.log(this.cfLatestDataRowFromClientTbl.middleName)
      if (this.cfLatestDataRowFromClientTbl.middleName) {
        return this.cfLatestDataRowFromClientTbl.middleName.charAt(0)
      } else {
        return ''
      }
    },
    initialLastName() {
      // console.log(this.cfLatestDataRowFromClientTbl.lastName)
      if (this.cfLatestDataRowFromClientTbl.lastName) {
        return this.cfLatestDataRowFromClientTbl.lastName
      } else {
        return ''
      }
    },
  },
  methods: {
    heading_clicked_so_set_up_state(pFormDefId) {
      const updateState = commonForAllCts.insertOrUpdate({
        data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: pFormDefId }],
      })
    },
  }
}
</script>

<style scoped>
.patient-name-section:hover .el-icon-edit {
  display: inline !important;
}
</style>