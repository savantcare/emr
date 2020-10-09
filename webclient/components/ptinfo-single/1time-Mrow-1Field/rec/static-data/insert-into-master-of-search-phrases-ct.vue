<script>
import clientSideTblOfCtSearchPhrases from '@/components/others/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
  

    // Step 2/3: Inserting Search interfaces to this component
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'recommendations',
        ctAbbr: 'rex',
        ctToShow: 'ptinfo-single/rec/view-layer/timeline.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })

    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add recommendations',
        ctAbbr: 'arex',
        ctToShow: 'ptinfo-single/rec/view-layer/table-ct.vue',
        displayLocation: 'edit-layer',
      },
    })
  },
}
</script>
