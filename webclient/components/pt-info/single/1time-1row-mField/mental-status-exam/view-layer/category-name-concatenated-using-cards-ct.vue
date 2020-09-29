<template>
  <showContentInCardComponent
    propMainCardName="Mental status exam"
    :propChildCardsArray="cfArOfMentalStatusExamForDisplay"
    :propClientSideTableLevelActions="[
      { content: 'Multi edit', elementIoIconClass: 'el-icon-money' },
      { content: 'Toggle card', elementIoIconClass: 'el-icon-remove-outline' },
      { content: 'Close card', elementIoIconClass: 'el-icon-close' },
    ]"
    :propClientSideRowLevelActions="[{}]"
  />
</template>

<script>
import clientSideTblOfMasterMentalStatusExam from '../db/client-side/structure/master-table-of-mental-status-exam.js'
import clientSideTblOfPatientMentalStatusExam from '../db/client-side/structure/patient-table-of-mental-status-exam.js'
import clientSideTableOfCommonForAllComponents from '@/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
  computed: {
    cfArOfMentalStatusExamForDisplay() {
      let arOfObjectsFromClientSideDB = clientSideTblOfPatientMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()

      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arOfObjectsFromClientSideDB[i]['cardContentOfTypeStringToShowInBodyOfCards'] =
          arOfObjectsFromClientSideDB[i].tblMentalStatusExamMasterLink.mentalStatusExamCategory +
          ': ' +
          arOfObjectsFromClientSideDB[i].tblMentalStatusExamMasterLink.mentalStatusExamDescription
      }

      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfIconDeleteClickedOnChildCard(pClientSideUniqRowId) {
      clientSideTblOfPatientMentalStatusExam.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit mental status exam',
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
