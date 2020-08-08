<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
import ormCTLifeCycle from '@/cts/core/ctMaster/orm-ct-life-cycle'

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
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'recommendations',
        ctAbbr: 'rex',
        ctToShow: 'spi/rec/vl/timeline.vue',
        displayLocation: 'ptsVl',
      },
    })

    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add recommendations',
        ctAbbr: 'arex',
        ctToShow: 'spi/rec/vl/table.vue',
        displayLocation: 'cl',
      },
    })
  },
}
</script>
