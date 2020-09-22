<!-- Reference implementation -->
<template>
  <div :style="contentStyle">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Reminders</span>
        <el-button-group style="float: right">
          <el-button
            style="padding: 3px"
            plain
            tabindex="-1"
            @click="mxOpenACtInCl"
            class="el-icon-circle-plus-outline"
          ></el-button>
          <el-button style="padding: 3px" plain tabindex="-1" @click="mxOpenMCtInCl">M</el-button>
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
            @click="mxOpenXCtInCl"
            class="el-icon-delete"
          ></el-button>
        </el-button-group>
      </div>
      <div class="grid-container data-card">
        <el-card
          v-for="rem in cfArOfRemForDisplayInTable"
          :key="rem.id"
          class="box-card content-card"
          shadow="hover"
          :style="mfGetCssClassName(rem)"
        >
          <div class="info-icon">
            <el-button type="text">
              <el-tooltip
                class="item"
                effect="light"
                content="info"
                placement="top-end"
                open-delay="500"
              >
                <i class="el-icon-info custom-info-icon"></i>
              </el-tooltip>
            </el-button>
          </div>
          <div class="delete-icon">
            <el-button type="text" @click="mxOpenDPrompt(rem.clientSideUniqRowId)">
              <el-tooltip
                class="item"
                effect="light"
                content="Click to delete"
                placement="top-end"
                open-delay="500"
              >
                <i class="el-icon-error custom-close-icon"></i>
              </el-tooltip>
            </el-button>
          </div>

          <el-tooltip
            class="item"
            effect="light"
            content="Click to change"
            placement="top-start"
            open-delay="500"
          >
            <!-- <el-button type="text">{{ rem.description }}</el-button> 
          if I use the button then a long text is not getting divided into multiple lines

          if rowStateInThisSession == 9 then the div should have a orange border
          Why we are doing this?
            Doctor is sitting infront of computer suddenly a new Rem appears. That is a confusing event.
            Instead if the new Rem that came on screen gets a orange border with top right corner saying "New rem added from socket" that is much better UX.
          -->
            <div class="text item content-div" @click="mxOpenCCtInCl(rem.clientSideUniqRowId)">
              <div v-if="rem.vnRowStateInSession === 9">
                Added from socket {{ rem.description }}
              </div>
              <div v-else>
                {{ rem.description }}
              </div>
            </div>
          </el-tooltip>
        </el-card>
      </div>

      <el-pagination
        :hide-on-single-page="true"
        background
        layout="pager"
        :total="cfLengthOfDataArray"
        @current-change="mfTablePageChanged"
      >
      </el-pagination>
    </el-card>
    <ctActOnSocketMessages></ctActOnSocketMessages>
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import clientSideTable from '../db/client-side/structure/rem-table.js'
import ctActOnSocketMessages from '../change-layer/act-on-socket-messages-from-server-ct.vue'
import clInvokeMixin from './cl-invoke-mixin.js'
import objCommonOrm from '@/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: { ctActOnSocketMessages },
  mixins: [clInvokeMixin, mxFullSyncWithDbServer],
  data() {
    return {
      tablePageNumber: 1,
      daRowStatesNotHavingCD: [2, 24, 2456, 2457, 24578], // Set of array of 'vnRowStateInSession' should not have change and delete button. As per GLOSSARY.md C stands for 'change' and D stands for 'delete'.
      daSelectedRemForDelete: [],
    }
  },
  computed: {
    contentStyle() {
      const objCommonRow = objCommonOrm.find(1)
      if (objCommonRow !== null) {
        let fontSizeOfContentEveryWhere = objCommonRow.fontSizeOfContentEveryWhereForNormalEyeSight
        if (objCommonRow.currentUserEyeSight == 'weak') {
          fontSizeOfContentEveryWhere = objCommonRow.fontSizeOfContentEveryWhereForWeakEyeSight
        }
        return {
          '--font-size-of-content-every-where': fontSizeOfContentEveryWhere,
        }
      }
    },
    cfLengthOfDataArray() {
      const arFromClientSideTable = clientSideTable.fnGetValidUniqueUuidRows()
      return arFromClientSideTable.length
    },

    cfArOfRemForDisplayInTable() {
      // Whenever clientSideTable will change this will get called. Even when there are 100 rows in the table when clientSideTable rem changes this gets called once'
      const arFromClientSideTable = clientSideTable.fnGetValidUniqueUuidNotEmptyRows('description')
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
      if (arFromClientSideTable.length) {
        let date = ''
        const startDataRowInidex = (this.tablePageNumber - 1) * 10
        const endDataRowIndex = startDataRowInidex + 10
        for (
          let i = startDataRowInidex;
          i < arFromClientSideTable.length && i < endDataRowIndex;
          i++
        ) {
          obj = {}
          obj.description = arFromClientSideTable[i].description
          // For date format ref: /cts/pt-info/single/1time-Mrow-1Field/reminder/view-layer/timeline-ct.vue:53
          date = new Date(arFromClientSideTable[i].ROW_START * 1000)
          obj.createdAt =
            date.toLocaleString('default', { month: 'long' }) +
            '-' +
            date.getDate() +
            '-' +
            date.getFullYear()
          obj.ROW_START = date.toLocaleString()
          obj.ROW_END = new Date(arFromClientSideTable[i].ROW_END * 1000).toLocaleString()
          obj.vnRowStateInSession = arFromClientSideTable[i].vnRowStateInSession
          obj.uuid = arFromClientSideTable[i].serverSideRowUuid
          obj.$id = arFromClientSideTable[i].$id
          obj.clientSideUniqRowId = arFromClientSideTable[i].clientSideUniqRowId
          arRemsForDisplay.push(obj)
        }
      }
      return arRemsForDisplay
    },
  },
  async mounted() {
    if (clientSideTable.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
  },
  methods: {
    mfTablePageChanged(pNewPageNumber) {
      this.tablePageNumber = pNewPageNumber
    },
    mfHandleSelectionForDelete(val) {
      this.daSelectedRemForDelete = val
    },
    // This is used to make the rows that are in change state a orange background.
    mfGetCssClassName(pRow) {
      const strOfNumber = pRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'color: #E6A23C;'
      } else {
        return 'color: #202020;'
      }
    },
  },
}
</script>

<style>
.grid-container {
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
.el-tag {
  margin-left: 10px;
  cursor: pointer;
}
.el-tag .el-tag__close {
  color: #409eff;
  float: right;
  top: 7px !important;
}
.grid-container.data-card .el-card__body {
  padding: 16px 10px 5px;
  height: 100%;
  line-height: 18px;
  text-decoration: none;
}
.delete-icon {
  position: absolute;
  top: -10px;
  right: 0px;
  z-index: 999;
  cursor: pointer;
  text-decoration: none;
}
.delete-icon .el-button.el-button--text {
  color: #ebe9e9;
}
.content-card.el-card.box-card:hover .delete-icon .el-button.el-button--text {
  color: #f39797;
}
.content-card {
  cursor: pointer;
  overflow-wrap: break-word;
  position: relative;
  margin: 5px;
}
.content-div {
  font-size: var(--font-size-of-content-every-where);
  height: 100%;
}
.content-div:hover {
  color: #409eff !important;
}
.content-card.el-card.box-card {
  border: 1px solid #e4e4e4;
}
.content-card.el-card.box-card:hover {
  border: 1px solid #b7daf7;
}
.custom-close-icon {
  font-size: 0.85rem;
}
.custom-close-icon:hover {
  color: #ff0000;
  font-size: 1.05rem;
}

.info-icon {
  position: absolute;
  top: -10px;
  right: 16px;
  z-index: 999;
  cursor: pointer;
  text-decoration: none;
}
.info-icon .el-button.el-button--text {
  color: #ebe9e9;
}
.content-card.el-card.box-card:hover .info-icon .el-button.el-button--text {
  color: #a1e5fa;
}
.custom-info-icon {
  font-size: 0.85rem;
}
.custom-info-icon:hover {
  color: #2ccbfc;
  font-size: 1.05rem;
}
</style>
