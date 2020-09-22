<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblMasterPsychReviewOfSystems from '@/components/pt-info/single/1time-1row-mField/psych-review-of-systems/db/client-side/structure/table-master-list-of-psych-review-of-systems.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '1', // this is uuid-1 to easily distinhuish it from the same row field -> id
        psychReviewOfSystemsDescription: 'Good grooming and hygiene',
        psychReviewOfSystemsCategory: 'Appearence',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '2',
        psychReviewOfSystemsDescription: 'No apparennt distress',
        psychReviewOfSystemsCategory: 'Appearence',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '3',
        psychReviewOfSystemsDescription: 'Well developed, well nourished',
        psychReviewOfSystemsCategory: 'Appearence',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '4',
        psychReviewOfSystemsDescription: 'Appears stated age',
        psychReviewOfSystemsCategory: 'Appearence',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '5',
        psychReviewOfSystemsDescription: 'Appears younger than stated age',
        psychReviewOfSystemsCategory: 'Appearence',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '6',
        psychReviewOfSystemsDescription: 'Appears older than stated age',
        psychReviewOfSystemsCategory: 'Appearence',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '7',
        psychReviewOfSystemsDescription: 'Obese',
        psychReviewOfSystemsCategory: 'Appearance',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '8',
        psychReviewOfSystemsDescription: 'Thin or cachectic',
        psychReviewOfSystemsCategory: 'Appearance',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '9',
        psychReviewOfSystemsDescription: 'Disheveled, unkempt',
        psychReviewOfSystemsCategory: 'Appearance',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '10',
        psychReviewOfSystemsDescription: 'Malodorous',
        psychReviewOfSystemsCategory: 'Appearance',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '11',
        psychReviewOfSystemsDescription: 'Pleasant and cooperative',
        psychReviewOfSystemsCategory: 'Attitude',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '12',
        psychReviewOfSystemsDescription: 'Uncooperative',
        psychReviewOfSystemsCategory: 'Attitude',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '13',
        psychReviewOfSystemsDescription: 'Hostile or defiant',
        psychReviewOfSystemsCategory: 'Attitude',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '14',
        psychReviewOfSystemsDescription: 'Guarded',
        psychReviewOfSystemsCategory: 'Attitude',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Evasive',
        psychReviewOfSystemsCategory: 'Attitude',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Apathetic',
        psychReviewOfSystemsCategory: 'Attitude',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Disorganized behavior',
        psychReviewOfSystemsCategory: 'Attitude',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '14',
        psychReviewOfSystemsDescription: 'Agitated',
        psychReviewOfSystemsCategory: 'Psychomotor',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Retarded',
        psychReviewOfSystemsCategory: 'Psychomotor',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Appropriate',
        psychReviewOfSystemsCategory: 'Eye-contact',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Downcast',
        psychReviewOfSystemsCategory: 'Eye-contact',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Intense',
        psychReviewOfSystemsCategory: 'Eye-contact',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Fleeting',
        psychReviewOfSystemsCategory: 'Eye-contact',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Regular, rate and rhythm',
        psychReviewOfSystemsCategory: 'Speech',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '14',
        psychReviewOfSystemsDescription: 'Agitated',
        psychReviewOfSystemsCategory: 'Psychomotor',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Retarded',
        psychReviewOfSystemsCategory: 'Psychomotor',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Appropriate',
        psychReviewOfSystemsCategory: 'Eye-contact',
      },
    })
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: '15',
        psychReviewOfSystemsDescription: 'Downcast',
        psychReviewOfSystemsCategory: 'Eye-contact',
      },
    })
  },
}
</script>
