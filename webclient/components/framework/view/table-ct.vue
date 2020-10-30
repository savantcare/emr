<!-- Reference implementation -->
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Reminders</span>
        <el-button-group style="float: right">
          <el-button
            style="padding: 3px"
            plain
            tabindex="-1"
            @click="mxOpenAddCtInEditLayer"
            class="el-icon-circle-plus-outline"
          ></el-button>
          <el-button style="padding: 3px" plain tabindex="-1" @click="mxOpenMultiEditCtInEditLayer">M</el-button>
          <el-button
            style="padding: 3px"
            plain
            tabindex="-1"
            @click="mxOpenDDialog"
            class="el-icon-document-delete"
          ></el-button>
          <el-button
            style="padding: 3px"
            plain
            tabindex="-1"
            @click="mxOpenTrashCanCtInEditLayer"
            class="el-icon-delete"
          ></el-button>
        </el-button-group>
      </div>
      <el-table
        :data="cfArOfRemForDisplayInTable"
        :show-header="false"
        size="mini"
        style="width: 100%"
        :stripe="true"
        :row-class-name="mfGetCssClassNameForEachDataRow"
        @selection-change="mfHandleSelectionForDelete"
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

        <el-table-column prop="description" label="Desc"> </el-table-column>
        <!-- Why is width = "60" for the action column
        Setting this makes the middle column of desc flexible.
        After this is set if desc has 200 words they will use the maximum available space.
          -->
        <el-table-column label="Actions" width="60">
          <template slot-scope="props">
            <!-- 
              Goal: 
              I open "add form" and enter "jai kali ma" and then i close the add form by pressing escape. In the table that row should not have change and delete

              How: 
              v-if to check is the 'vnRowStateInSession' not exists in array 'daRowStatesNotHavingCD'

              Ref: https://stackoverflow.com/questions/43881723/can-i-use-vue-js-v-if-to-check-is-the-value-exists-in-array
            -->
            <el-button-group v-if="!daRowStatesNotHavingCD.includes(props.row.vnRowStateInSession)">
              <el-button
                type="primary"
                size="mini"
                style="padding: 3px"
                plain
                tabindex="-1"
                @click="mxOpenEditCtInEditLayer(props.row.id)"
                class="el-icon-edit"
              ></el-button>
              <el-button
                type="warning"
                size="mini"
                style="padding: 3px"
                plain
                tabindex="-1"
                @click="mxOpenDPrompt(props.row.id)"
                class="el-icon-document-delete"
              ></el-button>
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
import clInvokeMixin from './cl-invoke-mixin.js'

import reminderClientTbl from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.
import recommendationClientTbl from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import miscNotesClientTbl from '@/components/temporal/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'
import planCommentsClientTbl from '@/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import processNotesClientTbl from '@/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
// defining all rows in this object
const clientTbl = {
  reminders: reminderClientTbl,
  recommendations: recommendationClientTbl,
  plan_comments: planCommentsClientTbl,
  miscellaneous_notes: miscNotesClientTbl,
  process_notes: processNotesClientTbl,
} // 1st row

export default {
  mixins: [clInvokeMixin],
  data() {
    return {
      tablePageNumber: 1,
      daRowStatesNotHavingCD: [2, 24, 2456, 2457, 24578], // Set of array of 'vnRowStateInSession' should not have change and delete button. As per GLOSSARY.md C stands for 'change' and D stands for 'delete'.
      daSelectedRemForDelete: [],
    }
  },
  props: {
    propComponentName: {
      type: String,
      required: true,
      validator: (value) => Object.keys(clientTbl).includes(value),
    },
  }, // firstProp is the ClientIdOfRowToChange
  computed: {
    cfLengthOfDataArray() {
      const arFromClientTbl = clientTbl.fnGetPresentUniqueUuidRows()
      return arFromClientTbl.length
    },

    cfArOfRemForDisplayInTable() {
      // Whenever clientTbl will change this will get called. Even when there are 100 rows in the table when clientTbl rem changes this gets called once'
      const arFromClientTbl = clientTbl.fnGetPresentUniqueUuidNotEmptyRows(
        this.propFormDef.atLeastOneOfFieldsForCheckingIfRowIsEmpty
      )
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
      if (arFromClientTbl.length) {
        let date = ''
        const startDataRowInidex = (this.tablePageNumber - 1) * 10
        const endDataRowIndex = startDataRowInidex + 10
        for (let i = startDataRowInidex; i < arFromClientTbl.length && i < endDataRowIndex; i++) {
          obj = {}
          obj.description = arFromClientTbl[i].description
          // For date format ref: /cts//framework/view/timeline-structure.vue:53
          date = new Date(arFromClientTbl[i].ROW_START * 1000)
          obj.createdAt =
            date.toLocaleString('default', { month: 'long' }) + '-' + date.getDate() + '-' + date.getFullYear()
          obj.ROW_START = date.toLocaleString()
          obj.ROW_END = new Date(arFromClientTbl[i].ROW_END * 1000).toLocaleString()
          obj.vnRowStateInSession = arFromClientTbl[i].vnRowStateInSession
          obj.uuid = arFromClientTbl[i].serverSideRowUuid
          obj.$id = arFromClientTbl[i].$id
          obj.id = arFromClientTbl[i].clientSideUniqRowId
          arRemsForDisplay.push(obj)
        }
      }
      return arRemsForDisplay
    },
  },
  async mounted() {},
  methods: {
    mfTablePageChanged(pNewPageNumber) {
      this.tablePageNumber = pNewPageNumber
    },
    mfHandleSelectionForDelete(val) {
      this.daSelectedRemForDelete = val
    },
    // This is used to make the rows that are in change state a orange background.
    mfGetCssClassNameForEachDataRow(pRow, pIndex) {
      const strOfNumber = pRow.row.vnRowStateInSession.toString()
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
