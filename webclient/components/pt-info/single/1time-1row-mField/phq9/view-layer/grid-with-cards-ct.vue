<template>
  <div>
    <showContentInCardComponent
      propMainCardName="phq9"
      :propChildCardsArray="cfArOfphq9ForDisplay"
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
      console.log(arOfObjectsFromClientSideDB)
      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arOfObjectsFromClientSideDB[i]['cardContentOfTypeStringToShowInBodyOfCards'] =
          arOfObjectsFromClientSideDB[i].tblPhq9MasterLink.phq9QuestionFullText +
          ': ' +
          arOfObjectsFromClientSideDB[i].optionValueChosenByPatient
      }
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfIconDeleteClickedOnChildCard(pClientSideUniqueRowId) {
      clientSideTblOfPatientPhq9.update({
        where: pClientSideUniqueRowId,
        data: {
          ROW_END: Math.floor(Date.now()),
        },
      })
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
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
