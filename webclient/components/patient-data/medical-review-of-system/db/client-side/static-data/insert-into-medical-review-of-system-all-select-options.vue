<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import medicalReviewOfSystemAllSelectOptionsTbl from '@/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    const selectOptions = {
      constitutional_systems_select: [
        { label: 'Change in appetite' },
        { label: 'Fatigue' },
        { label: 'Change in weight' },
        { label: 'Night sweats' },
        { label: 'None' },
        { label: 'Difficulty sleeping' },
        { label: 'Feeling hotter than everyone' },
        { label: 'Feeling colder than everyone' },
        { label: 'None' },
      ],
      skin_conditions_select: [
        { label: 'Sores that dont heal' },
        { label: 'Foot ulcers' },
        { label: 'Dry skin' },
        { label: 'Hair changes' },
        { label: 'None' },
      ],
      allergies_select: [{ label: 'Seasonal allergies' }, { label: 'Hives' }, { label: 'None' }],
      ear_nose_mouth_throat_select: [
        { label: 'Pain in the front of your neck' },
        { label: 'Neck lumps or goiter' },
        { label: 'Difficulty Swallowing' },
        { label: 'Change in Hearing' },
        { label: 'Voice Changes' },
        { label: 'None' },
      ],
      eyes_head_select: [
        { label: 'Loss of Vision' },
        { label: 'Blurry Vision' },
        { label: 'Eye burning/watering' },
        { label: 'None' },
      ],
      respiratory_select: [
        { label: 'Shortness of breath' },
        { label: 'Frequent coughs' },
        { label: 'Wheezing' },
        { label: 'None' },
      ],
      cardiovascular_select: [
        { label: 'Chest Pain' },
        { label: 'Palpitations/Heart racing' },
        { label: 'Swollen ankles' },
        { label: 'None' },
      ],
      gastrointestinal_select: [
        { label: 'Heartburn' },
        { label: 'Nausea' },
        { label: 'Abdominal pain' },
        { label: 'Diarrhea' },
        { label: 'Constipation' },
        { label: 'None' },
      ],
      urinary_select: [
        { label: 'Blood in urine' },
        { label: 'Frequent urination at night' },
        { label: 'Problems with libido/sex drive' },
        { label: 'Men - problems with erections' },
        { label: 'None' },
      ],
      endocrine_select: [
        { label: 'Breast discharge' },
        { label: 'Women - irregular periods' },
        { label: 'Women - difficulty getting pregnant' },
        { label: 'None' },
      ],
      musculoskeletal_select: [
        { label: 'Back Pain' },
        { label: 'Pain in joints' },
        { label: 'Muscle crampsBony painNone' },
      ],
      neurological_select: [
        { label: 'Shakiness' },
        { label: 'Tingling/burning of feet or hands' },
        { label: 'Numbness of feet or hands' },
        { label: 'Episodes of facial numbness or difficulty speaking' },
        { label: 'Headaches' },
        { label: 'None' },
      ],
      psychological_select: [
        { label: 'Anxiety' },
        { label: 'Mood swings worse than usual' },
        { label: 'Depressed' },
        { label: 'None' },
      ],
      heme_lymphatic_select: [
        { label: 'Bruise Easily' },
        { label: 'Have swollen glands' },
        { label: 'Bleed a lot' },
        { label: 'None' },
      ],
    }
    let rowUniqId = 0
    let fldName = {}
    for (fldName in selectOptions) {
      const obj = selectOptions[fldName]
      for (let i = 0; i < obj.length; i++) {
        const label = obj[i].label
        medicalReviewOfSystemAllSelectOptionsTbl.insert({
          data: {
            fieldOptionId: '#' + rowUniqId + '#', // # is the seperator charecter so toggle can work. Look inside manage-rows
            fieldOptionLabel: label,
            fieldNameInDb: fldName,
          },
        })
        rowUniqId++
      }
    }
  },
}
</script>
