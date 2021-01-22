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
        value: 'goals',
        remoteUrl: 'https://www.savantcare.com/v1/api/goal-api/public/index.php/api/scBrainToGetGoal?activityDoneByUserId=19724&clientTimeOfActivity=2020-12-11 15:21:17&clientTimeZoneAbbreviationOfActivity=India Standard Time&userId=19724',
        ctAbbr: 'g',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'add goals',
        ctAbbr: 'ag',
        ctToShow: 'patient-data/goals/change-layer/add-ct.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit goals',
        ctAbbr: 'cg',
        ctToShow: 'patient-data/goals/change-layer/goal-edit.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit goals',
        ctAbbr: 'mcg',
        ctToShow: 'patient-data/goals/change-layer/medit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted goals',
        ctAbbr: 'dg',
        ctToShow: 'patient-data/goals/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
