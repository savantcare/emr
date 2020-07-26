<!-- When  i went from 80 to 100 the line count went rom 276 to 230 -->
<template>
  <div>
    <dbInteraction></dbInteraction>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Reminders</span>
        <el-button-group style="float: right;">
          <el-button style="padding: 3px;" type="success" plain tabindex="-1" @click="mxOpenACtInCl"
            >A</el-button
          >
          <el-button style="padding: 3px;" type="primary" plain tabindex="-1" @click="mxOpenMCtInCl"
            >M</el-button
          >
          <el-button style="padding: 3px;" type="warning" plain tabindex="-1" @click="mxOpenDDialog"
            >D</el-button
          >
          <el-button style="padding: 3px;" type="info" plain tabindex="-1" @click="mxOpenXCtInCl"
            >X</el-button
          >
        </el-button-group>
      </div>
      <el-table
        :data="cfArOfRemForDisplayInTable"
        :show-header="false"
        size="mini"
        style="width: 100%;"
        :stripe="true"
        :row-class-name="mfGetCssClassName"
        @selection-change="mfHandleSelectionForDiscontinue"
      >
        <el-table-column type="selection" width="42" tabindex="-1"> </el-table-column>
        <!-- From developer console if I set:
<input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="" tabindex="-1">
as tabindex=-1 then the KB tab key does not take user to the checkbox.
Setting the <el-table-column as tabindex=-1 does not help -->

        <el-table-column type="expand">
          <template slot-scope="props">
            <p>Created: {{ props.row.createdAt }}</p>
            <p>Row start: {{ props.row.ROW_START }}</p>
            <p>Row end: {{ props.row.ROW_END }}</p>
            <p>uuid: {{ props.row.uuid }}</p>
            <p>id: {{ props.row.id }}</p>
          </template>
        </el-table-column>

        <el-table-column prop="remDesc" label="Desc"> </el-table-column>
        <!-- Why is width = "60" for the action column
        Setting this makes the middle column of desc flexible.
        After this is set if desc has 200 words they will use the maximum available space.
          -->
        <el-table-column label="Actions" width="60">
          <template slot-scope="props">
            <!-- 
              Goal: 
              I open "add form" and enter "jai kali ma" and then i close the add form by pressign escape. In the table that row should not have change and discontinue

              How: 
              v-if to check is the 'rowStateInThisSession' not exists in array 'daRowStatesNotHavingCD'

              Ref: https://stackoverflow.com/questions/43881723/can-i-use-vue-js-v-if-to-check-is-the-value-exists-in-array
            -->
            <el-button-group
              v-if="!daRowStatesNotHavingCD.includes(props.row.rowStateInThisSession)"
            >
              <el-button
                type="primary"
                size="mini"
                style="padding: 3px;"
                plain
                tabindex="-1"
                @click="mxOpenCCtInCl(props.row.id)"
                >C</el-button
              >
              <el-button
                type="warning"
                size="mini"
                style="padding: 3px;"
                plain
                tabindex="-1"
                @click="mxOpenDPrompt(props.row.id)"
                >D</el-button
              >
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :hide-on-single-page="true"
        background
        layout="pager"
        :total="cfLengthOfDataArray"
        @current-change="mfTablePageChanged"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import dbInteraction from '../db/load-initial-data'
import clInvokeMixin from './cl-invoke-mixin.js'
import ormRem from '@/cts/spi/rem/db/vuex-orm/rem.js'
export default {
  components: { dbInteraction },
  mixins: [clInvokeMixin],
  data() {
    return {
      tablePageNumber: 1,
      daRowStatesNotHavingCD: [2, 24, 2456, 2457, 24578], // Set of array of 'rowStateInThisSession' should not have change and discontinue button. As per GLOSSARY.md C stands for 'change' and D stands for 'discontinue'.
      daSelectedRemForDiscontinue: [],
    }
  },
  computed: {
    cfLengthOfDataArray() {
      const arFromORM = ormRem.getValidUniqueUuidRows()
      return arFromORM.length
    },

    cfArOfRemForDisplayInTable() {
      // Whenever ormRem will change this will get called. Even when there are 100 rows in the table when orm rem changes this gets called once'
      const arFromORM = ormRem.getValidUniqueUuidNotEmptyRows('remDesc')
      /*  Q) Should this function return the array it gets from ORM or modify the array?
              Option1: Return ORM array
                  -ves:
                    1. Created at needs to be made inside the template
                    2. Making pager would be harder
                  +ves:
                    No need to run the for loop
      */
      const arRemsForDisplay = []
      let obj = {}
      if (arFromORM.length) {
        let date = ''
        const startDataRowInidex = (this.tablePageNumber - 1) * 10
        const endDataRowIndex = startDataRowInidex + 10
        for (let i = startDataRowInidex; i < arFromORM.length && i < endDataRowIndex; i++) {
          obj = {}
          obj.remDesc = arFromORM[i].remDesc
          // For date format ref: /cts/spi/rem/vl/timeline.vue:53
          date = new Date(arFromORM[i].ROW_START)
          obj.createdAt = date.toLocaleString('default', { month: 'long' }) + '-' + date.getDate()
          obj.rowStateInThisSession = arFromORM[i].rowStateInThisSession
          obj.uuid = arFromORM[i].uuid
          obj.$id = arFromORM[i].$id
          obj.id = arFromORM[i].id
          arRemsForDisplay.push(obj)
        }
      }
      return arRemsForDisplay
    },
  },
  mounted() {},
  methods: {
    mfTablePageChanged(pNewPageNumber) {
      this.tablePageNumber = pNewPageNumber
    },
    mfHandleSelectionForDiscontinue(val) {
      this.daSelectedRemForDiscontinue = val
    },
    mfGetCssClassName(pRow, pIndex) {
      const strOfNumber = pRow.row.rowStateInThisSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'unsaved-data'
      } else {
        return ''
      }
    },
  },
}
</script>

<style>
tr.el-table__row.unsaved-data {
  background: #fde2b9;
}
.el-table--striped .el-table__body tr.el-table__row--striped.unsaved-data td {
  background: #f9d399;
}
</style>
