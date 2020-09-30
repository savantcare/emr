<!-- Reference implementation -->
<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Reminders"
      :propChildCardsArray="cfArOfRemForDisplayInTable"
      :propClientSideTableLevelActions="[
        {
          actionDescription: 'Add',
          actionUIByElementIoIconClass: 'el-icon-circle-plus-outline',
        },
        {
          actionDescription: 'Multi edit',
          actionUIByElementIoIconClass: 'el-icon-money',
        },
        {
          actionDescription: 'Multi delete',
          actionUIByElementIoIconClass: 'el-icon-document-delete',
        },
        {
          actionDescription: 'Toggle card display',
          actionUIByElementIoIconClass: 'el-icon-remove-outline',
        },
        {
          actionDescription: 'Show deleted',
          actionUIByElementIoIconClass: 'el-icon-delete',
        },
      ]"
      :propClientSideRowLevelActions="[
        { actionDescription: 'Edit', actionUIByElementIoIconClass: 'el-icon-edit' },
        {
          actionDescription: 'Show data timeline',
          actionUIByElementIoIconClass: 'el-icon-discover',
        },
        {
          actionDescription: 'Delete row',
          actionUIByElementIoIconClass: 'el-icon-circle-close',
        },
      ]"
    ></showContentInCardComponent>

    <ctActOnSocketMessages></ctActOnSocketMessages>
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import clientSideTable from '../db/client-side/structure/reminders-of-a-patient-table.js'
import ctActOnSocketMessages from '../edit-layer/act-on-socket-messages-from-server-ct.vue'
import clInvokeMixin from './cl-invoke-mixin.js'
import clientSideTableOfCommonForAllComponents from '@/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: { ctActOnSocketMessages, showContentInCardComponent },
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
          obj.cardContentOfTypeStringToShowInBodyOfCards = obj.description
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
    mfIconMultiDeleteClickedOnChildCard(val) {
      this.daSelectedRemForDelete = val
    },
    mfEditIconClicked(pClientSideDataRowId) {
      this.mxOpenEditCtInEditLayer(pClientSideDataRowId)
    },
  },
}
</script>
