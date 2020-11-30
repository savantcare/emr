<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import serviceStatementsAllSelectOptionsTbl from '@/components/patient-data/service-statements/db/client-side/structure/service-statements-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    const selectOptions = {
      modality_of_psychotherapy_multi_select: [
        { label: 'Acceptance and commitement therapy' },
        { label: 'Bibilotherapy' },
        { label: 'CBT' },
        { label: 'Client Centered' },
        { label: 'Dialectical Behavior therapy' },
        { label: 'EMDR' },
        { label: 'Existential humanistic' },
        { label: 'Holistic Therapy' },
        { label: 'Insight oriented' },
        { label: 'Motivational interviewing' },
        { label: 'Positive psychology' },
        { label: 'Psycho analytic' },
        { label: 'Psycho dynamic' },
        { label: 'Solution focussed' },
        { label: 'Supportive' },
        { label: 'Trauma focussed' },
      ],
      review_of_systems_multi_select: [
        { label: 'I have reviewed 2 or more systems with patient' },
        { label: 'I performed 14pt review of systems' },
      ],
      optional_multi_select: [
        {
          label: 'Pertinent Medical Records Reviewed',
          subText: 'CURES is CA state controlled substance patient registry',
        },
        {
          label: 'Please refer to Assessment and Plan section',
          subText: 'for content of coordination of care and counseling',
        },

        {
          label: 'Please refer to Subjective and plan section for content of coordination of care and counseling.',
        },
        {
          label: 'Please refer to Subjective and Plan section for content and goals of Psychotherapy',
        },
        {
          label: 'Please refer to Assessment section for content and goals of Psychotherapy',
        },
        {
          label: 'Please refer to Subjective section for content and goals of Psychotherapy',
        },
        {
          label:
            'Informed consent received from patient verbally about risks and benefits of telemedicine. Risks involving (but not limited to) - confidentiality, communication issues, missing body language cues affecting clinical judgement, limitations during crisis management and intervention. Benefits being - ease of use, time saved during travel.',
        },
        {
          label:
            'Discussed safety, to go to the ER, call the clinic or 911 if there is any sense of danger to self or others',
        },
        {
          label:
            'The patient is not at acute risk of harm to self or others at this time and can be maintained at an outpatient level of care',
        },
        {
          label:
            'This patient was made aware, that Savantcare does not provide after-hours, weekend or holiday on-call coverage for psychiatric emergencies. If an urgent or emergent psychiatric or medical concern comes up when we are not open, the patient was made aware to seek assistance from the closest emergency room, their primary care physician, or call 911',
        },
        {
          label:
            'Risks, benefits and the side effects of the medications discussed with patient and consent for treatment obtained',
        },
        {
          label: 'Discussed safety regards to guns, medications and sharps',
        },
        {
          label:
            'At this time, patient is not at imminent risk of harm to self or others and can be maintained at an outpatient level of care.',
        },
        {
          label:
            'Discussed risks, benefits and side effects of medications with both parents and patient in detail and consent obtained from both parents and patient.',
        },
        {
          label:
            'I counseled patient extensively on sleep hygiene, including consistent bedtime and wake up time, minimizing screen time/exercise/food intake before bed, etc.',
        },
        {
          label: 'Had client begin to reframe and challenge negative self-talk.',
        },
        {
          label: 'Status is stable.',
        },
        {
          label: 'Status is worsening.',
        },
        {
          label: 'Patient is deemed high risk.',
        },
        {
          label: 'Patient is deemed moderate risk.',
        },
        {
          label: 'Patient is deemed low risk.',
        },

        { label: 'Further data and history obtained from family member', subText: 'as per patient’s consent.' },
        {
          label: 'Spent greater than 50 % of time face to face',
          subText: 'with patient and/or family doing counseling and/or coordination of care.',
        },
        {
          label: 'Risks, benefits and side effects of psychotropic medications',
          subText: 'have been discussed with the patient.',
        },
      ],
    }

    let rowUniqId = 0
    let fldName = {}
    for (fldName in selectOptions) {
      const obj = selectOptions[fldName]
      for (let i = 0; i < obj.length; i++) {
        const label = obj[i].label
        serviceStatementsAllSelectOptionsTbl.insert({
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
