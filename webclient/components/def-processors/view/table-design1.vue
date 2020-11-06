<template>
  <el-card class="box-card sc-service-statement-all-content" :body-style="{ paddingLeft: '3px' }" shadow="hover">
    <div slot="header" class="clearfix">
      <span :tabindex="cfPosInArCardsInPtsOfViewLayer * 100 + 1" @keyup="mfKeyPress($event, 'header')" class="capitalize">{{
        propFormDef.id
      }}</span>
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
        <el-table :data="cfArOfRemForDisplayInTable" :show-header="showTableHeader" style="width: 100%" :row-style="mfStyleForEachDataRow">
            <el-table-column v-for="(propFieldDef, id) in propFormDef.fieldsDef"
                :key="id"
                :label="propFieldDef.fieldNameInUi">
                <!-- 
                :formatter="propFieldDef.formatter"
                :min-width="propFieldDef.minWidth"
                 -->
                <div slot-scope="{row}">
                    <span v-if="propFieldDef.fieldType === 'date'">{{ row[propFieldDef.fieldNameInDb] | moment }}</span>
                    <span v-else-if="propFieldDef.fieldType === 'autocomplete'">{{ propFieldDef.selectOptions(row[propFieldDef.fieldNameInDb], callBack => {}) }}</span>
                    <span v-else>{{ row[propFieldDef.fieldNameInDb] }}</span>
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
import { rowState } from '@/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'

import allClientTbls from '../all-client-tables.js'

export default {
  mixins: [clInvokeMixin],
  data() {
    return {}
  },
  props: {
    propFormDef: {
      type: Object,
      required: true,
      validator: function (obj) {
        // id and fields must be present
        if (obj.id) {
          if (obj.fieldsDef) {
            if (Object.keys(allClientTbls).includes(obj.id)) {
              return true
            }
          }
        }

        return false
      },
    },
    showTableHeader: {
        type: Boolean,
        default: true
    }
  }, // firstProp is the ClientIdOfRowToChange
  computed: {
    cfPosInArCardsInPtsOfViewLayer() {
      const arFromClientTbl = clientTblOfDynamicCards.query().where('name', this.propFormDef.id).get()
      return arFromClientTbl['clientSideUniqRowId']
    },
    cfArOfRemForDisplayInTable() {
      const arFromClientTbl = allClientTbls[this.propFormDef.id].fnGetPresentUniqueUuidNotEmptyRows(
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

      return arFromClientTbl
    },

  },
  filters: {
    moment: function (time) {
      if(time) {
            if(Number(time)) {
                return moment(Number(time)).format(
                    'MMM DD YYYY'
                )
            } else {
                return moment(String(time)).format(
                    'MMM DD YYYY'
                )
            }
        }
        return ''
    },
  },
  methods: {
    mfStyleForEachDataRow(items) {
        const rowData = items.row;
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
        return {color: '#E6A23C'}  // this is hex code for orange
      }

      // Case 3
      return {color: '#67c23a'} // this is hex code for green
    },

  },
  async mounted() {},
}
</script>
<style>
/* Generation ->
==============
                                       .sc-reminder-all-content
 Generation 1                                      |
==============                     _________________________________
                                  |                                |
                    .sc-reminder-all-content-header                |
 Generatiobn 2                                                     |
                                    _______________________________|
                                  |
                  .sc-reminder-all-content-body
==============                    |
                                  |
                   .sc-reminder-individual-card
Generatiobn 3                     |
                       ________________________________________________________________________________
                      |                                 |                                             |
        .sc-reminder-individual-card-content    .sc-reminder-individual-card-info-icon           .sc-reminder-individual-card-delete-icon

==============
*/
.capitalize {
    text-transform: capitalize;
}
.emptyRow {
  color: #b1b1b1;
}
/* Generation Level 1 */
.sc-reminder-all-content .el-card__header {
  /* Goal: Manage Distance from border to content in header*/
  padding: 10px !important;
}

.sc-reminder-all-content .el-card__body {
  /* Goal: Manage  Distance from border to content in body*/
  padding: 10px !important;
}

/* Generation Level 2 / Child 1 == Goal: Header icon management */

/* When anywhere inside the card make the action icons in the card header -> level 1 visual */
.el-card:hover .sc-reminder-all-content-header .el-button-group {
  display: inline-block !important;
}

/* When inside the card header make the action icons in the card header -> level 2 visual */
.el-card__header:hover .sc-reminder-all-content-header .el-icon-edit {
  color: #67c23a !important;
  font-size: 1.5rem;
}
.el-card__header:hover .sc-reminder-all-content-header .el-icon-s-grid {
  color: #409eff !important;
}
.el-card__header:hover .sc-reminder-all-content-header .el-icon-document-delete {
  color: #f56c6c !important;
}
.el-card__header:hover .sc-reminder-all-content-header .el-icon-delete {
  color: #909399 !important;
}

/* Generation Level 2 / Child 2 */

/* Goal: When less space display 1 card in a row. When more space display 100 cards in a row. */
.sc-reminder-all-content-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Some other grid-template-columns options are :
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, max(200px)); compared to minmax(200px, 1fr) there is more magin between cols and less content fits.
  */
  grid-gap: 1px;
  grid-auto-flow: row; /* This is default value */
  margin: 1px;
}

/* Generation Level 3 */

/* Goal: Margin and padding of individual card */

.sc-reminder-individual-card {
  cursor: pointer;
  overflow-wrap: break-word;
  position: relative;
  margin: 1px;
  padding: 10px 1px 1px !important;
}

/* Goal: Header icon management  */
.el-card:hover .sc-reminder-individual-card .el-button-group {
  display: inline-block !important;
  position: absolute;
  top: 0px;
  right: 0px;
}

.sc-reminder-individual-card:hover .el-icon-discover {
  color: #909399 !important;
}

.sc-reminder-individual-card:hover .el-icon-circle-close {
  color: #f56c6c !important;
  font-size: 1.5rem;
}
</style>