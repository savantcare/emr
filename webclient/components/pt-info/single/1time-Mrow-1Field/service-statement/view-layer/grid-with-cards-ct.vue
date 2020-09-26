<template>
  <showContentInCard
    mainCardName="Service statement"
    :childCardsArray="cfArOfServiceStatementForDisplay"
    clientSideDBLevelTableActions="edit"
    clientSideCardLevelActions="remove, info"
  />
</template>

<script>
import clientSideTblOfMasterServiceStatements from '../db/client-side/structure/master-table-of-service-statements.js'
import clientSideTblOfPatientServiceStatements from '../db/client-side/structure/patient-table-of-service-statements.js'
import objCommonOrm from '@/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'
import showContentInCard from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: { showContentInCard },
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()

      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arOfObjectsFromClientSideDB[i]['cardContent'] =
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
    mfOpenEditCtInEditLayer() {
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
