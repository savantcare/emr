<template>
  <el-card class="box-card sc-service-statement-all-content" :body-style="{ paddingLeft: '3px' }" shadow="hover">
    <div slot="header" class="clearfix">
      <span
        :tabindex="cfPosInArCardsInPtsOfViewLayer * 100 + 1"
        @keyup="mfKeyPress($event, 'header')"
        class="capitalize"
        >{{ _fieldDef.id }}</span
      >
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
    <div class="body">
      <div v-if="cfArOfRemForDisplayInTable.length > 0">
        <el-table
          :data="cfArOfRemForDisplayInTable"
          :show-header="showTableHeader"
          style="width: 100%"
          :row-style="mfStyleForEachDataRow"
        >
          <el-table-column v-for="(_fieldDef, id) in _fieldDef.fieldsDef" :key="id" :label="_fieldDef.nameInUi">
            <!-- 
                :formatter="_fieldDef.formatter"
                :min-width="_fieldDef.minWidth"
                 -->
            <div slot-scope="{ row }">
              <span v-if="_fieldDef.type === 'date'">{{ row[_fieldDef.nameInDb] | moment }}</span>
              <span v-else-if="_fieldDef.type === 'autocomplete'">{{
                _fieldDef.selectOptions(row[_fieldDef.nameInDb], (callBack) => {})
              }}</span>
              <span v-else>{{ row[_fieldDef.nameInDb] }}</span>
            </div>
          </el-table-column>
          <el-table-column label="Actions" :align="'right'">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  size="mini"
                  style="padding: 3px"
                  plain
                  tabindex="-1"
                  @click="mxOpenEditCtInEditLayer(scope.row.clientSideUniqRowId)"
                  class="el-icon-edit"
                ></el-button>
                <el-button
                  size="mini"
                  style="padding: 3px"
                  plain
                  tabindex="-1"
                  @click="mxOpenDPrompt(scope.row.clientSideUniqRowId)"
                  class="el-icon-document-delete"
                ></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>

<script>
import moment from 'moment'
import clInvokeMixin from './cl-invoke-mixin.js'
import clientTblOfDynamicCards from '@/components/non-temporal/search-phrases/db/client-side/structure/dynamic-cards-table.js'
import { rowState } from '@/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import allPatientDataTbls from '@/components/non-temporal/form-manager/all-client-tables.js'
export default {
  mixins: [clInvokeMixin],
  data() {
    return {}
  },
  props: {
    _fieldDef: {
      type: Object,
      required: true,
      validator: function (obj) {
        // id and fields must be present
        if (obj.id) {
          if (obj.fieldsDef) {
            if (Object.keys(allPatientDataTbls).includes(obj.id)) {
              return true
            }
          }
        }
        return false
      },
    },
    showTableHeader: {
      type: Boolean,
      default: true,
    },
  }, // firstProp is the ClientIdOfRowToChange
  computed: {
    cfPosInArCardsInPtsOfViewLayer() {
      const arFromClientTbl = clientTblOfDynamicCards.query().where('name', this._fieldDef.id).get()
      return arFromClientTbl['clientSideUniqRowId']
    },
    cfArOfRemForDisplayInTable() {
      const arFromClientTbl = allPatientDataTbls[this._fieldDef.id].fnGetPresentUniqueUuidNotEmptyRows(
        this._fieldDef.atLeastOneOfFieldsForCheckingIfRowIsEmpty
      )
      /*  Q) Should this function return the array it gets from ORM or modify the array?
              Option1: Return ORM array
                  -ves:
                    1. Created at needs to be made inside the template
                    2. Making pager would be harder
                  +ves:
                    No need to run the for loop
      */
      return arFromClientTbl
    },
  },
  filters: {
    moment: function (time) {
      if (time) {
        if (Number(time)) {
          return moment(Number(time)).format('MMM DD YYYY')
        } else {
          return moment(String(time)).format('MMM DD YYYY')
        }
      }
      return ''
    },
  },
  methods: {
    mfStyleForEachDataRow(items) {
      const rowData = items.row
      /* The color conventions are:
      Case 1: black: same as DB or it is a copy but no change has been done
      Case 2: orange: form validatoion has failed
      Case 3: green: some edits have been made and it pases form validation */
      if (
        rowData.vnRowStateInSession.toString().endsWith(rowState.SameAsDB) ||
        rowData.vnRowStateInSession.toString().endsWith(rowState.Copy)
      ) {
        // Case 1
        return
      } else if (rowData.vnRowStateInSession.toString().endsWith(rowState.FormValidationFail)) {
        // case 2
        return { color: '#E6A23C' } // this is hex code for orange
      }
      // Case 3
      return { color: '#67c23a' } // this is hex code for green
    },
  },
  async mounted() {},
}
</script>
<style>
.capitalize {
  text-transform: capitalize;
}
.emptyRow {
  color: #b1b1b1;
}
</style>
