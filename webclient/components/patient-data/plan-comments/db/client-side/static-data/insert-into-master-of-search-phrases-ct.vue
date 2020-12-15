<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'plan-comments',
        remoteUrl: 'https://www.savantcare.com/v1/api/plan-comment/public/index.php/api/scBrainToGetPlanComments?actionDoneByUserId=19724&actionDoneOnUserId=19724&clientTime=2020-12-11 15:21:17&clientTimeZone=India Standard Time',
        ctAbbr: 'rem',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'add plan-comments',
        ctAbbr: 'arem',
        ctToShow: 'patient-data/plan-comments/change-layer/add-ct.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit plan-comments',
        ctAbbr: 'crem',
        ctToShow: 'patient-data/plan-comments/change-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit plan-comments',
        ctAbbr: 'mcrem',
        ctToShow: 'patient-data/plan-comments/change-layer/medit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted plan-comments',
        ctAbbr: 'drem',
        ctToShow: 'patient-data/plan-comments/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
