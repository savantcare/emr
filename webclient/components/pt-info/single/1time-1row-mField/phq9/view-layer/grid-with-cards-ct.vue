<template>
  <div>
    <showContentInCardComponent
      propMainCardName="phq9"
      :propChildCardsArray="cfArOfphq9ForDisplay"
      :propClientSideTableLevelActions="[
        { content: 'minimize', class: 'el-icon-remove-outline' },
        { content: 'Edit', class: 'el-icon-edit' },
      ]"
      propClientSideRowLevelActions="edit, info"
    />
  </div>
</template>

<script>
import clientSideTblOfPatientPhq9 from '../db/client-side/structure/patient-table-of-phq9.js'
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
  computed: {
    cfArOfphq9ForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientPhq9
        .query()
        .with('tblPhq9MasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arOfObjectsFromClientSideDB[i]['cardContent'] =
          arOfObjectsFromClientSideDB[i].tblPhq9MasterLink.phq9QuestionFullText +
          ' : ' +
          arOfObjectsFromClientSideDB[i].valueChosenByPatient
      }
      return arOfObjectsFromClientSideDB
    },
    cfGetVariablesFromClientSideTableToUseInCSS() {
      const objCommonRow = objCommonOrm.find(1) // if this is async then it does not work.
      if (objCommonRow !== null) {
        let fontSizeOfContentEveryWhere = objCommonRow.fontSizeOfContentEveryWhereForNormalEyeSight
        if (objCommonRow.currentUserEyeSight == 'weak') {
          fontSizeOfContentEveryWhere = objCommonRow.fontSizeOfContentEveryWhereForWeakEyeSight
        }
        return {
          '--font-size-of-content-every-where': fontSizeOfContentEveryWhere,
        }
      }
    },
  },
  methods: {
    mfIconDeleteClickedOnChildCard(pClientSideUniqRowId) {
      clientSideTblOfPatientPhq9.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenCCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'phq9 edit',
      })
    },
    // This is used to make the rows that are in change state a orange background.
    mfGetCssClassName(pRow) {
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