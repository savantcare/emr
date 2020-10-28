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
      :propClientRowLevelActions="[{}]"
    />
  </div>
</template>

<script>
import clientTblOfPatientPhq9 from '../db/client-side/structure/patient-table-of-phq9.js'
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
  computed: {
    cfArOfphq9ForDisplay() {
      const arOfObjectsFromClientDB = clientTblOfPatientPhq9
        .query()
        .with('tblPhq9MasterLink')
        .where('ROW_END', 2147483648000)
        .get()
      console.log(arOfObjectsFromClientDB)
      for (var i = 0; i < arOfObjectsFromClientDB.length; i++) {
        arOfObjectsFromClientDB[i]['cardContentOfTypeStringToShowInBodyOfCards'] =
          arOfObjectsFromClientDB[i].tblPhq9MasterLink.phq9QuestionFullText +
          ': ' +
          arOfObjectsFromClientDB[i].optionValueChosenByPatient
      }
      return arOfObjectsFromClientDB
    },
  },
  methods: {
    mfIconDeleteClickedOnChildCard(pClientUniqueRowId) {
      clientTblOfPatientPhq9.update({
        where: pClientUniqueRowId,
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
