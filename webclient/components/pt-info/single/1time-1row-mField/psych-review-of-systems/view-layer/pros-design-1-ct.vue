<template>
  <showContentInCardComponent
    propMainCardName="Psych review of systems"
    :propChildCardsArray="cfArOfPsychReviewOfSystemsForDisplay"
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
    :propClientSideRowLevelActions="[{}]"
  >
    <el-card
      slot="bodySlotContentFromParentToShowAboveChildCards"
      v-for="pros in cfArOfPsychReviewOfSystemsForDisplay"
      :key="pros.id"
      class="box-card sc-individual-child-card"
      shadow="hover"
      :style="mfGetCssClassNameForEachDataRow(pros)"
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
            @click="mfIconDeleteClickedOnChildCard(pros.clientSideUniqRowId)"
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

      <!-- <el-button type="text">{{ pros.description }}</el-button> 
          if I use the button then a long text is not getting divided into multiple lines
          if rowStateInThisSession == 9 then the div should have a orange border
          Why we are doing this?
            Doctor is sitting infront of computer suddenly a new pros appears. That is a confusing event.
            Instead if the new pros that came on screen gets a orange border with top right corner saying "New pros added from socket" that is much better UX.
          -->
      <div v-if="pros.vnRowStateInSession === 9">Added from socket {{ pros.description }}</div>
      <div v-else>
        {{ pros.cardContentOfTypeStringToShowInBodyOfCards }}
      </div>
    </el-card>
  </showContentInCardComponent>
</template>

<script>
import clientSideTblOfMasterPsychReviewOfSystems from '../db/client-side/structure/master-table-of-psych-review-of-systems.js'
import clientSideTblOfPatientPsychReviewOfSystems from '../db/client-side/structure/patient-table-of-psych-review-of-systems.js'
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },

  computed: {
    cfArOfPsychReviewOfSystemsForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()

      console.log(arOfObjectsFromClientSideDB)

      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arOfObjectsFromClientSideDB[i]['cardContentOfTypeStringToShowInBodyOfCards'] =
          arOfObjectsFromClientSideDB[i].tblPsychReviewOfSystemsMasterLink
            .psychReviewOfSystemsCategory +
          ': ' +
          arOfObjectsFromClientSideDB[i].tblPsychReviewOfSystemsMasterLink
            .psychReviewOfSystemsDescription
      }

      console.log(arOfObjectsFromClientSideDB)

      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfDeletePsychReviewOfSystems(pClientSideUniqRowId) {
      clientSideTblOfPatientPsychReviewOfSystems.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit psych review of systems',
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
  },
  async mounted() {},
}
</script>
