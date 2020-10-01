<template>
  <showContentInCardComponent
    propMainCardName="Psych review of systems"
    :propChildCardsArray="cfArOfPsychReviewOfSystemsForDisplay"
    :propClientSideTableLevelActions="[
      {
        actionDescription: 'Multi edit',
        actionUIByElementIoIconClass: 'el-icon-money',
      },
      {
        actionDescription: 'Toggle card display',
        actionUIByElementIoIconClass: 'el-icon-remove-outline',
      },
      {
        actionDescription: 'Close card',
        actionUIByElementIoIconClass: 'el-icon-close',
      },
    ]"
    :propClientSideRowLevelActions="[{}]"
  />
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
    mfOpenEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit psych review of systems',
      })
    },
  },
  async mounted() {},
}
</script>
