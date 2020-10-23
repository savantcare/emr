<!-- Reference implementation -->
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Phone Number</span>
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
      <div class="grid-container">
        <div v-for="rem in cfArOfRemForDisplayInTable" :key="rem.id" :style="mfGetCssClassNameForEachDataRow(rem)">
          <!-- <el-button type="text">{{ rem.description }}</el-button> 
          if I use the button then a long text is not getting divided into multiple lines
          -->
          <div>{{ rem.description }}</div>
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              style="padding: 3px"
              plain
              tabindex="-1"
              @click="mxOpenEditCtInEditLayer(rem.id)"
              class="el-icon-edit"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              style="padding: 3px"
              plain
              tabindex="-1"
              @click="mxOpenDPrompt(rem.id)"
              class="el-icon-document-delete"
            ></el-button>
          </el-button-group>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import clientSideTable from '../db/client-side/structure/table.js'
import clInvokeMixin from './cl-invoke-mixin.js'
export default {
  mixins: [clInvokeMixin, mxFullSyncWithDbServer],
  data() {
    return {
      tablePageNumber: 1,
      daRowStatesNotHavingCD: [2, 24, 2456, 2457, 24578], // Set of array of 'vnRowStateInSession' should not have change and delete button. As per GLOSSARY.md C stands for 'change' and D stands for 'delete'.
      daSelectedRemForDelete: [],
    }
  },
  computed: {
    cfLengthOfDataArray() {
      const arFromClientSideTable = clientSideTable.fnGetPresentUniqueUuidRows()
      return arFromClientSideTable.length
    },

    cfArOfRemForDisplayInTable() {
      // Whenever clientSideTable will change this will get called. Even when there are 100 rows in the table when clientSideTable rem changes this gets called once'
      const arFromClientSideTable = clientSideTable.fnGetPresentUniqueUuidNotEmptyRows('description')
      /*  Q) Should this function return the array it gets from ORM or modify the array?
              Option1: Return ORM array
                  -ves:
                    1. Created at needs to be made inside the template
                    2. Making pager would be harder
                  +ves:
                    No need to run the for loop
      */
      const arphoneNumberForDisplay = []
      let obj = {}
      if (arFromClientSideTable.length) {
        let date = ''
        const startDataRowInidex = (this.tablePageNumber - 1) * 10
        const endDataRowIndex = startDataRowInidex + 10
        for (let i = startDataRowInidex; i < arFromClientSideTable.length && i < endDataRowIndex; i++) {
          obj = {}
          obj.description = arFromClientSideTable[i].description
          // For date format ref: /cts/1time-eachField-multiValues/common/view-layer/timeline-ct.vue:53
          date = new Date(arFromClientSideTable[i].ROW_START * 1000)
          obj.createdAt =
            date.toLocaleString('default', { month: 'long' }) + '-' + date.getDate() + '-' + date.getFullYear()
          obj.ROW_START = date.toLocaleString()
          obj.ROW_END = new Date(arFromClientSideTable[i].ROW_END * 1000).toLocaleString()
          obj.vnRowStateInSession = arFromClientSideTable[i].vnRowStateInSession
          obj.uuid = arFromClientSideTable[i].serverSideRowUuid
          obj.$id = arFromClientSideTable[i].$id
          obj.id = arFromClientSideTable[i].clientSideUniqRowId
          arphoneNumberForDisplay.push(obj)
        }
      }
      return arphoneNumberForDisplay
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
    mfGetCssClassNameForEachDataRow(pRow) {
      const strOfNumber = pRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'color: #E6A23C;'
      } else {
        return 'color: #409EFF;'
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
</style>
