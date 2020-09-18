<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/search-phrases-of-components-table'
import ormCTLifeCycle from '@/components/core/ctMaster/orm-ct-life-cycle'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    ormCTLifeCycle.insert({
      data: {
        name: 'recommendations',
        status: 3,
      },
    })

    // Step 2/3: Inserting Search interfaces to this component
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'recommendations',
        ctAbbr: 'rex',
        ctToShow: 'pt-info/single/rec/vl/timeline.vue',
        displayLocation: 'ptsVl',
      },
    })

    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'add recommendations',
        ctAbbr: 'arex',
        ctToShow: 'pt-info/single/rec/vl/table-ct.vue',
        displayLocation: 'cl',
      },
    })
  },
}
</script>
