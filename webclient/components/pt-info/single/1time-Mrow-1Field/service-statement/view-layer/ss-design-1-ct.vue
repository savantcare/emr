<template>
  <showContentInCardComponent
    propMainCardName="Service statement"
    :propClientSideTableLevelActions="[
      {
        actionDescription: 'Multi edit',
        actionUIByElementIoIconClass: 'el-icon-money',
      },
      {
        actionDescription: 'Toggle card display',
        actionUIByElementIoIconClass: 'el-icon-serviceStatementove-outline',
      },
      {
        actionDescription: 'Close card',
        actionUIByElementIoIconClass: 'el-icon-close',
      },
    ]"
    :propClientSideRowLevelActions="[{}]"
  >
    <el-card
      slot="bodySlotContentFromParentToShowAboveChildCards"
      v-for="serviceStatement in cfArOfServiceStatementForDisplay"
      :key="serviceStatement.id"
      class="box-card sc-individual-child-card"
      shadow="hover"
      :style="mfGetCssClassNameForEachDataRow(serviceStatement)"
    >
      <el-button-group style="float: right; display: none">
        <el-tooltip
          class="item"
          effect="light"
          content="Click to delete"
          placement="top-end"
          :open-delay="500"
        >
          <el-button
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            @click="mfIconDeleteClickedOnChildCard(serviceStatement.clientSideUniqRowId)"
            class="el-icon-circle-close"
          >
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="light"
          content="info"
          placement="top-end"
          :open-delay="500"
        >
          <el-button
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            class="el-icon-discover"
          >
          </el-button>
        </el-tooltip>
      </el-button-group>

      <!-- <el-button type="text">{{ serviceStatement.description }}</el-button> 
          if I use the button then a long text is not getting divided into multiple lines
          if rowStateInThisSession == 9 then the div should have a orange border
          Why we are doing this?
            Doctor is sitting infront of computer suddenly a new serviceStatement appears. That is a confusing event.
            Instead if the new serviceStatement that came on screen gets a orange border with top right corner saying "New serviceStatement added from socket" that is much better UX.
          -->
      <div v-if="serviceStatement.vnRowStateInSession === 9">
        Added from socket {{ serviceStatement.description }}
      </div>
      <div v-else>
        {{ serviceStatement.cardContentOfTypeStringToShowInBodyOfCards }}
      </div>
    </el-card>
  </showContentInCardComponent>
</template>

<script>
import clientSideTblOfPatientServiceStatements from '../db/client-side/structure/patient-table-of-service-statements.js'
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()

      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arOfObjectsFromClientSideDB[i]['cardContentOfTypeStringToShowInBodyOfCards'] =
          arOfObjectsFromClientSideDB[i].tblServiceStatementsMasterLink.serviceStatementCategory +
          ': ' +
          arOfObjectsFromClientSideDB[i].tblServiceStatementsMasterLink.serviceStatementDescription
      }

      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfIconDeleteClickedOnChildCard(pClientSideUniqRowId) {
      clientSideTblOfPatientServiceStatements.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit service statement',
      })
    },
    // This is used to make the rows that are in change state a orange background.
    mfGetCssClassNameForEachDataRow(pRow) {
      const strOfNumber = pRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'color: #E6A23C;'
      } else {
        return 'color: #202020;'
      }
    },
    mfShowTimeLine: () => {
      alert('Timeline of this data')
      return false
    },
  },
  async mounted() {},
}
</script>
