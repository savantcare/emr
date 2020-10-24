<template>
  <showContentInCardComponent
    propMainCardName="Past psych history"
    :propActionsThatCanBeInvokedFromCardHeader="[
      {
        actionDescription: 'Multi edit',
        isDefaultAction: true,
      },
      {
        actionDescription: 'Toggle card display',
      },
      {
        actionDescription: 'Close card',
      },
    ]"
    :propClientRowLevelActions="[{}]"
  >
    <el-card
      slot="bodySlotContentFromParentToShowAboveChildCards"
      v-for="pastPsychHistory in cfArOfPastPsychHistoryForDisplay"
      :key="pastPsychHistory.id"
      class="box-card sc-individual-child-card"
      shadow="hover"
      :style="mfGetCssClassNameForEachDataRow(pastPsychHistory)"
    >
      <el-button-group style="float: right; display: none">
        <el-tooltip class="item" effect="light" content="Click to delete" placement="top-end" :open-delay="500">
          <el-button
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            @click="mfIconDeleteClickedOnChildCard(pastPsychHistory.clientSideUniqRowId)"
            class="el-icon-circle-close"
          >
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="info" placement="top-end" :open-delay="500">
          <el-button style="padding: 3px; color: #c0c4cc; border: none" plain class="el-icon-discover"> </el-button>
        </el-tooltip>
      </el-button-group>

      <!-- <el-button type="text">{{ pastPsychHistory.description }}</el-button> 
          if I use the button then a long text is not getting divided into multiple lines
          if rowStateInThisSession == 9 then the div should have a orange border
          Why we are doing this?
            Doctor is sitting infront of computer suddenly a new pastPsychHistory appears. That is a confusing event.
            Instead if the new pastPsychHistory that came on screen gets a orange border with top right corner saying "New pastPsychHistory added from socket" that is much better UX.
          -->
      <div v-if="pastPsychHistory.vnRowStateInSession === 9">Added from socket {{ pastPsychHistory.description }}</div>
      <div v-else>
        {{ pastPsychHistory.cardContentOfTypeStringToShowInBodyOfCards }}
      </div>
    </el-card>
  </showContentInCardComponent>
</template>

<script>
import clientSideTblOfPatientPastPsychHistory from '../db/client-side/structure/patient-table-of-past-psych-history.js'
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
  computed: {
    cfArOfPastPsychHistoryForDisplay() {
      const arOfObjectsFromClientDB = clientSideTblOfPatientPastPsychHistory
        .query()
        .with('tblPastPsychHistoryMasterLink')
        .where('ROW_END', 2147483648000)
        .get()

      for (var i = 0; i < arOfObjectsFromClientDB.length; i++) {
        arOfObjectsFromClientDB[i]['cardContentOfTypeStringToShowInBodyOfCards'] =
          arOfObjectsFromClientDB[i].tblPastPsychHistoryMasterLink.pastPsychHistoryCategory +
          ': ' +
          arOfObjectsFromClientDB[i].tblPastPsychHistoryMasterLink.pastPsychHistoryDescription
      }

      return arOfObjectsFromClientDB
    },
  },
  methods: {
    mfIconDeleteClickedOnChildCard(pClientUniqRowId) {
      clientSideTblOfPatientPastPsychHistory.update({
        where: pClientUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now()),
        },
      })
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit past psych history',
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
