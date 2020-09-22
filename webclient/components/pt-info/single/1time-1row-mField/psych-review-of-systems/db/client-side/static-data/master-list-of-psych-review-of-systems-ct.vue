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
        psychReviewOfSystemsDescription: 'Depressive mood',
        psychReviewOfSystemsCategory: 'Depression',
        psychReviewOfSystemsFieldType: 'radio',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Interest',
        psychReviewOfSystemsCategory: 'Depression',
        psychReviewOfSystemsFieldType: 'radio',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Sleep',
        psychReviewOfSystemsCategory: 'Depression',
        psychReviewOfSystemsFieldType: 'radio',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Gulf / Self esteem',
        psychReviewOfSystemsCategory: 'Depression',
        psychReviewOfSystemsFieldType: 'radio',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Energy',
        psychReviewOfSystemsCategory: 'Depression',
        psychReviewOfSystemsFieldType: 'radio',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Conc/Dist',
        psychReviewOfSystemsCategory: 'Depression',
        psychReviewOfSystemsFieldType: 'radio',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'Appetite',
        psychReviewOfSystemsCategory: 'Depression',
        psychReviewOfSystemsFieldType: 'radio',
      },
    })

    i = i + 1
    clientSideTblMasterPsychReviewOfSystems.insert({
      data: {
        psychReviewOfSystemsMasterId: i,
        psychReviewOfSystemsDescription: 'PMR/PMA',
        psychReviewOfSystemsCategory: 'Depression',
        psychReviewOfSystemsFieldType: 'radio',
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
