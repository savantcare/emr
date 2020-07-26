<script>
import ormSearchPhrasesOfCt from '@/cts/core/vl-search/orm-search-phrases-of-ct'
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
        ctToShowInCL: 'spi/',
        ctToShowInCsOfVl: 'spi/rec/vl/timeline.vue',
        layer: 'view',
      },
    })

    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add recommendations',
        ctAbbr: 'arex',
        ctToShowInCL: 'spi/rec/vl/table.vue',
        layer: 'change',
      },
    })
  },
}
</script>
