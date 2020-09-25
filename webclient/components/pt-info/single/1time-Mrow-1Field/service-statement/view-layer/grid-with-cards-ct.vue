<template>
  <showContentInCard
    mainCardName="Service statement"
    :childCardsArray="cfArOfServiceStatementForDisplay"
    clientSideDBLevelTableActions="edit"
    clientSideCardLevelActions="remove, info"
  />
</template>

<script>
import clientSideTblMasterServiceStatements from '../db/client-side/structure/table-master-list-of-service-statements.js'
import clientSideTblPatientServiceStatements from '../db/client-side/structure/table-service-statements-of-a-patient.js'
import objCommonOrm from '@/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'
import showContentInCard from '@/components/pt-info/single/common/show-content-in-card-ct.vue'

export default {
  components: { showContentInCard },
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblPatientServiceStatements
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
      clientSideTblPatientServiceStatements.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenCCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
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
