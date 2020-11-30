<!-- Reference implementation -->
<template>
  <div>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
      <el-card
        slot="bodySlotContentFromParentToShowAboveChildCards"
        v-for="rem in cfArOfRemForDisplayInTable"
        :key="rem.id"
        class="box-card sc-individual-child-card"
        shadow="hover"
        :style="mfGetCssClassNameForEachDataRow(rem)"
      >
        <el-button-group style="float: right; display: none; z-index: 1000">
          <el-tooltip class="item" effect="light" content="info" placement="top-end" :open-delay="500">
            <el-button
              style="padding: 3px; color: #c0c4cc; border: none; background: transparent"
              plain
              class="el-icon-discover"
            >
            </el-button>
          </el-tooltip>
        </el-button-group>

        <!-- <el-button type="text">{{ rem.description }}</el-button> 
          if I use the button then a long text is not getting divided into multiple lines
          if rowStateInThisSession == 9 then the div should have a orange border
          Why we are doing this?
            Doctor is sitting infront of computer suddenly a new Rem appears. That is a confusing event.
            Instead if the new Rem that came on screen gets a orange border with top right corner saying "New rem added from socket" that is much better UX.
          -->
        <div v-if="rem.vnRowStateInSession === 9">Added from socket {{ rem.description }}</div>
        <div v-else>
          {{ rem.description }}
        </div>
        <div class="left-half-card-overlay" @click="mxOpenEditCtInEditLayer(rem.clientSideUniqRowId)"></div>
        <div class="right-half-card-overlay" @click="mfIconDeleteClickedOnChildCard(rem.clientSideUniqRowId)"></div>
      </el-card>
    </div>

    <ctActOnSocketMessages></ctActOnSocketMessages>
  </div>
</template>

<script>
import clientTbl from '../db/client-side/structure/reminders-of-a-patient-table.js'
import ctActOnSocketMessages from '@/components/papers/note-change/templates/act-on-socket-messages-from-server-ct.vue'
import clInvokeMixin from './cl-invoke-mixin.js'
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'
import { rowState } from '@/components/non-temporal/form-manager/crud/manage-rows-of-table-in-client-side-orm.js'

export default {
  components: { ctActOnSocketMessages, showContentInCardComponent },
  mixins: [clInvokeMixin],
  data() {
    return {
      tablePageNumber: 1,
      daRowStatesNotHavingCD: [
        rowState.New,
        rowState.New_Changed,
        rowState.New_Changed_RequestedSave_FormValidationFail,
        rowState.New_Changed_RequestedSave_FormValidationPass,
        rowState.New_Changed_RequestedSave_FormValidationPass_ApiError,
      ], // Set of array of 'vnRowStateInSession' should not have change and delete button. As per GLOSSARY.md C stands for 'change' and D stands for 'delete'.
      daSelectedRemForDelete: [],
    }
  },
  computed: {
    cfLengthOfDataArray() {
      const arFromClientTbl = clientTbl.fnGetPresentUniqueUuidRows()
      return arFromClientTbl.length
    },

    cfArOfRemForDisplayInTable() {
      // Whenever clientTbl will change this will get called. Even when there are 100 rows in the table when clientTbl rem changes this gets called once'
      const arFromClientTbl = clientTbl.fnGetPresentUniqueUuidNotEmptyRows(['description'])
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
          // For date format ref: /cts/temporal/reminders/view-layer/timeline-ct.vue:53
          date = new Date(arFromClientTbl[i].ROW_START * 1000)
          obj.createdAt =
            date.toLocaleString('default', { month: 'long' }) + '-' + date.getDate() + '-' + date.getFullYear()
          obj.ROW_START = date.toLocaleString()
          obj.ROW_END = new Date(arFromClientTbl[i].ROW_END * 1000).toLocaleString()
          obj.vnRowStateInSession = arFromClientTbl[i].vnRowStateInSession
          obj.uuid = arFromClientTbl[i].serverSideRowUuid
          obj.$id = arFromClientTbl[i].$id
          obj.clientSideUniqRowId = arFromClientTbl[i].clientSideUniqRowId
          obj.cardContentOfTypeStringToShowInBodyOfCards = obj.description
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
    mfIconMultiDeleteClickedOnChildCard(val) {
      this.daSelectedRemForDelete = val
    },
    mfEditIconClicked(pClientDataRowId) {
      this.mxOpenEditCtInEditLayer(pClientDataRowId)
    },
    mfGetCssClassNameForEachDataRow(pRow) {
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

<style scoped>
/**
  What are the significance of classes left-half-card-overlay and right-half-card-overlay?
  -- Our target was to show blue overlay (to indicate edit mode) in the left half side of a card and red overlay (to indicate delete mode) on right half side of the card on mouseover.
  These classes are for that feature. By default, it's background-color is transparent and on hover we are changing the background-color as par our requirement.
*/
.left-half-card-overlay {
  width: 50%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 999;
}
.left-half-card-overlay:hover {
  background-color: rgba(204, 204, 255, 0.3);
}
.right-half-card-overlay {
  width: 50%;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 999;
}
.right-half-card-overlay:hover {
  background-color: rgba(255, 204, 203, 0.3);
}
</style>
