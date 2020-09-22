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
    let i = 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Good grooming and hygiene',
        psychReviewOfSystemsCategory: 'Depression',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'No apparennt distress',
        psychReviewOfSystemsCategory: 'Depression',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Well developed, well nourished',
        psychReviewOfSystemsCategory: 'Depression',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Appears stated age',
        psychReviewOfSystemsCategory: 'Depression',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Appears younger than stated age',
        psychReviewOfSystemsCategory: 'Depression',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Appears older than stated age',
        psychReviewOfSystemsCategory: 'Depression',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Obese',
        psychReviewOfSystemsCategory: 'Gateway mood symptoms',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Thin or cachectic',
        psychReviewOfSystemsCategory: 'Gateway mood symptoms',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Disheveled, unkempt',
        psychReviewOfSystemsCategory: 'Gateway mood symptoms',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Malodorous',
        psychReviewOfSystemsCategory: 'Gateway mood symptoms',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Pleasant and cooperative',
        psychReviewOfSystemsCategory: 'Mania / Hypomania',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Uncooperative',
        psychReviewOfSystemsCategory: 'Mania / Hypomania',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Hostile or defiant',
        psychReviewOfSystemsCategory: 'Mania / Hypomania',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Guarded',
        psychReviewOfSystemsCategory: 'Mania / Hypomania',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Evasive',
        psychReviewOfSystemsCategory: 'Mania / Hypomania',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Apathetic',
        psychReviewOfSystemsCategory: 'Mania / Hypomania',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Disorganized behavior',
        psychReviewOfSystemsCategory: 'Mania / Hypomania',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Agitated',
        psychReviewOfSystemsCategory: 'Psychosis',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Retarded',
        psychReviewOfSystemsCategory: 'Psychosis',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Appropriate',
        psychReviewOfSystemsCategory: 'Sleep',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Downcast',
        psychReviewOfSystemsCategory: 'Sleep',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Intense',
        psychReviewOfSystemsCategory: 'Sleep',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Fleeting',
        psychReviewOfSystemsCategory: 'Sleep',
      },
    })
  },
}
</script>
