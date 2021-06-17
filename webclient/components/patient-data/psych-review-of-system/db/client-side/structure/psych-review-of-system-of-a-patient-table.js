// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'

var prosEachFieldAllSelectOptions = require('../static-data/insert-into-psych-review-of-system-all-select-options')
  .prosEachFieldAllSelectOptions

import psychReviewOfSystemsForPatientTbl from '~/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class psychReviewOfSystemsForPatientClass extends clientTblManage {
  static entity = 'tblPsychReviewOfSystem'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/psych-review-of-system/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      /* This field is used to store the value of tblPsychReviewOfSystemsAllSelectOptions/psychReviewOfSystemFieldOptionId
         E.g: The  tblPsychReviewOfSystemsAllSelectOptions has:
         psychReviewOfSystemFieldOptionId  |         psychReviewOfSystemFieldOptionLabel
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient
          When doctor assigns 2 to this patient then in this table psychReviewOfSystemFieldOptionId = 2 */

      subjective: this.string(null).nullable(),

      gateway_depressed: this.number(0),
      gateway_energetic: this.number(0),
      gateway_interest: this.number(0),
      gateway_mood: this.number(0),
      gateway_irritable: this.number(0),
      gateway_difficult: this.number(0),

      depressive_mood: this.number(0),
      depressive_interest: this.number(0),
      depressive_sleep: this.number(0),
      depressive_esteem: this.number(0),
      depressive_energy: this.number(0),
      depressive_conc: this.number(0),
      depressive_appetite: this.number(0),
      depressive_retardation: this.number(0),
      depressive_suicidal: this.number(0),
      depressive_note: this.string(null).nullable(),

      mania_mood: this.number(0),
      mania_irritable: this.number(0),
      mania_energy: this.number(0),
      mania_sleep: this.number(0),
      mania_talking: this.number(0),
      mania_racing: this.number(0),
      mania_distractibility: this.number(0),
      mania_risk: this.number(0),
      mania_note: this.string(null).nullable(),

      psychosis_delusions: this.number(0),
      psychosis_hallucinations: this.number(0),
      psychosis_speech: this.number(0),
      psychosis_behavior: this.number(0),
      psychosis_negativeSx: this.number(0),
      psychosis_note: this.string(null).nullable(),

      sleep_assessment: this.number(0),
      sleep_note: this.string(null).nullable(),

      substance_list: this.string(null).nullable(),
      substance_note: this.string(null).nullable(),

      gad_anxiety: this.number(0),
      gad_difficult: this.number(0),
      gad_restless: this.number(0),
      gad_fatigued: this.number(0),
      gad_concentrating: this.number(0),
      gad_irritability: this.number(0),
      gad_muscle: this.number(0),
      gad_disturbance: this.number(0),
      gad_note: this.string(null).nullable(),

      panic_attacks: this.number(0),
      panic_impairment: this.number(0),
      panic_intensity: this.number(0),
      panic_note: this.string(null).nullable(),

      social_marked_anxiety: this.number(0),
      social_fear_that: this.number(0),
      social_social_situation: this.number(0),
      social_intense_anxiety: this.number(0),
      social_anxiety_is_out_of_proportion: this.number(0),
      social_anxiety_note: this.string(null).nullable(),

      ocd_obsessions: this.number(0),
      ocd_compulsions: this.number(0),
      ocd_distressing: this.number(0),
      ocd_insight: this.number(0),
      ocd_note: this.string(null).nullable(),

      ptsd_re_experiencing: this.number(0),
      ptsd_avoidance: this.number(0),
      ptsd_arousal: this.number(0),
      ptsd_negative: this.number(0),
      ptsd_note: this.string(null).nullable(),

      adhd_inattention : this.number(0),
      adhd_hyperactivity: this.number(0),
      adhd_careless: this.number(0),
      adhd_problem: this.number(0),
      adhd_poor: this.number(0),
      adhd_fails: this.number(0),
      adhd_difficulty: this.number(0),
      adhd_reluctant: this.number(0),
      adhd_loses: this.number(0),
      adhd_distracted: this.number(0),
      adhd_forgetful: this.number(0),
      adhd_fidgets: this.number(0),
      adhd_leaves: this.number(0),
      adhd_feels: this.number(0),
      adhd_unable: this.number(0),
      adhd_seems: this.number(0),
      adhd_talks: this.number(0),
      adhd_blurts: this.number(0),
      adhd_difficulty_waiting: this.number(0),
      adhd_interrupts: this.number(0),
      adhd_note: this.string(null).nullable(),

      anorexia_food_restriction: this.number(0),
      anorexia_intense_fear: this.number(0),
      anorexia_body_image: this.number(0),
      anorexia_bmi: this.string(null).nullable(),
      anorexia_note: this.string(null).nullable(),

      bulimia_binge_eating: this.number(0),
      bulimia_compensatory_behaviors: this.number(0),
      bulimia_self_evaluation: this.number(0),
      bulimia_note: this.string(null).nullable(),

      dementia_note: this.string(null).nullable(),

      suicide_ideations: this.string('"#No#"'),
      suicide_note: this.string(null).nullable(),

      homicide_ideations: this.string('"#No#"'),
      homicide_note: this.string(null).nullable(),

      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const psychReviewOfSystemFormDef = {
  id: 'psych_review_of_system',
  plural: 'Subjective + Psych ROS (HPI)',
  singular: 'pysch review of system',
  sliderOptions: {
    width: 'auto',
    height: 200,
    direction: 'btt',
    tooltip: 'always',
    marks: false,
    interval: 0.5,
    min: 0,
    max: 1,
  },
  fieldsDef: [
    {
      nameInDb: 'subjective',
      nameInUi: 'Subjective',
      type: 'tribute-editor',
      showLabel: false,
      // Everwhere the content is in grid and I want to take the whole width available inside the grid cell

      style: 'padding: 20px; grid-column-start: 1;grid-column-end: 4',
    },

    //Gateway mood symptoms
    //---------------------
    {
      nameInDb: 'gateway_depressed',
      nameInUi: 'Felt depressed',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gateway_energetic',
      nameInUi: 'Low interest or motivation',
      type: 'vertical-slider',
      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gateway_interest',
      nameInUi: 'Abnormally irritable',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gateway_mood',
      nameInUi: 'Abnormally energetic',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gateway_irritable',
      nameInUi: 'Abnormal mood',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gateway_difficult',
      nameInUi: 'Difficult do the above symptoms',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    //---------------------

    //Depression
    //---------------------
    {
      nameInDb: 'depressive_mood',
      nameInUi: 'Depressive mood',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'depressive_interest',
      nameInUi: 'Interest',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'depressive_sleep',
      nameInUi: 'Sleep',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'depressive_esteem',
      nameInUi: 'Gulf / Self esteem',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'depressive_energy',
      nameInUi: 'Energy',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'depressive_conc',
      nameInUi: 'Conc/Dist',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'depressive_appetite',
      nameInUi: 'Apptetite',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'depressive_retardation',
      nameInUi: 'PMR/PMA',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'depressive_suicidal',
      nameInUi: 'Suicidal ideation',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'depressive_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Mania/Hypomania
    //---------------------
    {
      nameInDb: 'mania_mood',
      nameInUi: 'Mood elevation',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'mania_irritable',
      nameInUi: 'Irritable',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'mania_energy',
      nameInUi: 'Energy',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'mania_sleep',
      nameInUi: 'Sleep',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'mania_talking',
      nameInUi: 'Talking',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'mania_racing',
      nameInUi: 'Racing',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'mania_distractibility',
      nameInUi: 'Distractibility',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'mania_risk',
      nameInUi: 'Risk',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'mania_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Psychosis
    //---------------------
    {
      nameInDb: 'psychosis_delusions',
      nameInUi: 'Delusions',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'psychosis_hallucinations',
      nameInUi: 'Hallucinations',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'psychosis_speech',
      nameInUi: 'Disorganized Speech',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'psychosis_behavior',
      nameInUi: 'Disorganized or Catatonic Behavior',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'psychosis_negativeSx',
      nameInUi: 'Negative Sx`s',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'psychosis_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Sleep
    //---------------------
    {
      nameInDb: 'sleep_assessment',
      nameInUi: 'Average number of hours slept per night (doctors assessment)',
      type: 'number',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    {
      nameInDb: 'sleep_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Substance Use
    //---------------------
    {
      nameInDb: 'substance_list',
      nameInUi: 'Substance List',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'substance_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //GAD
    //---------------------
    {
      nameInDb: 'gad_anxiety',
      nameInUi: 'Excess worry or anxiety',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gad_difficult',
      nameInUi: 'Difficult to control worry',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gad_restless',
      nameInUi: 'Restless or on edge',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gad_fatigued',
      nameInUi: 'Fatigued',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gad_concentrating',
      nameInUi: 'Difficulty Concentrating',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gad_irritability',
      nameInUi: 'Irritability',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gad_muscle',
      nameInUi: 'Muscle Tension',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gad_disturbance',
      nameInUi: 'Sleep Disturbance',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'gad_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Panic Attacks
    //---------------------
    {
      nameInDb: 'panic_attacks',
      nameInUi: 'Panic Attacks Per Month',
      type: 'number',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    {
      nameInDb: 'panic_impairment',
      nameInUi: 'Impairment Caused by Panic Attacks',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'panic_intensity',
      nameInUi: 'Intensity of Panic Attacks',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'panic_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //------------------------

    //SOCIAL ANXIETY
    //---------------------
    {
      nameInDb: 'social_marked_anxiety',
      nameInUi: 'Marked anxiety about 1 or more social situations',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'social_fear_that',
      nameInUi: 'Fear that will act in a way that will be negatively evaluated',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'social_social_situation',
      nameInUi: 'Social situation(s) almost always provokes anxiety',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'social_intense_anxiety',
      nameInUi: 'Social situation(s) is avoided or endured with intense anxiety',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'social_anxiety_is_out_of_proportion',
      nameInUi: 'Anxiety is out of proportion to actual threat of the situation',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'social_anxiety_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //OCD
    //---------------------
    {
      nameInDb: 'ocd_obsessions',
      nameInUi: 'Obsessions',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'ocd_compulsions',
      nameInUi: 'Compulsions',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'ocd_distressing',
      nameInUi: 'Distressing or Impairing or Time-Consuming ( > 1 hr/day)',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'ocd_insight',
      nameInUi: 'Insight',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'ocd_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //PTSD
    //---------------------
    {
      nameInDb: 'ptsd_re_experiencing',
      nameInUi: 'Re-experiencing Symptoms',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'ptsd_avoidance',
      nameInUi: 'Avoidance Symptoms',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'ptsd_arousal',
      nameInUi: 'Arousal Symptoms',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'ptsd_negative',
      nameInUi: 'Negative Mood or Cognitions',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'ptsd_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    // ADHD
    //---------------------
    {
      nameInDb: 'adhd_inattention',
      nameInUi: 'Inattention',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_hyperactivity',
      nameInUi: 'Hyperactivity',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_careless',
      nameInUi: 'Careless mistakes or poor attention to detail',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_problem',
      nameInUi: 'Problem sustaining attention',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_poor',
      nameInUi: 'Poor listening',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_fails',
      nameInUi: 'Fails to finish tasks',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_difficulty',
      nameInUi: 'Difficulty organizing tasks',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_reluctant',
      nameInUi: 'Reluctant to engage in tasks that require sustained mental effort',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_loses',
      nameInUi: 'Loses things often',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_distracted',
      nameInUi: 'Distracted by extraneous stimuli',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_forgetful',
      nameInUi: 'Forgetful daily activities',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_fidgets',
      nameInUi: 'Fidgets often',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_leaves',
      nameInUi: 'Leaves seat often when sitting is expected',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_feels',
      nameInUi: 'Feels restless',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_unable',
      nameInUi: 'Unable to engage in leisurely activities quietly',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_seems',
      nameInUi: 'Seems "on the go" or "driven by motor"',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_talks',
      nameInUi: 'Talks excessively',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_blurts',
      nameInUi: 'Blurts out often',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_difficulty_waiting',
      nameInUi: 'Difficulty waiting turn',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_interrupts',
      nameInUi: 'Interrupts or intrudes on others',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   1: 'Not present',
      //   2: 'Sub-syndromal',
      //   3: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'adhd_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Anorexia
    //---------------------
    {
      nameInDb: 'anorexia_food_restriction',
      nameInUi: 'Food restriction leading to significantly low weight',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'anorexia_intense_fear',
      nameInUi: 'Intense fear of gaining weight or behavior that interferes with wt gain',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'anorexia_body_image',
      nameInUi: 'Body image disturbance, or excess influence of shape on self evaluation, or denial of seriousness of low body weight',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'anorexia_bmi',
      nameInUi: 'Latest BMI',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    {
      nameInDb: 'anorexia_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Bulimia
    //---------------------
    {
      nameInDb: 'bulimia_binge_eating',
      nameInUi: 'Binge eating (large quantity and lack of control of eating)',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'bulimia_compensatory_behaviors',
      nameInUi: 'Compensatory behaviors (vomiting, laxatives, fasting, exercise)',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'bulimia_self_evaluation',
      nameInUi: 'Self evaluation highly influenced by shape',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 1, step: 1 },
      // marks: {
      //   0: 'Not evaluated',
      //   0.5: 'Not present',
      //   1: 'Sub-syndromal',
      //   2: 'Syndromal',
      // },
      // ft: function formatTooltip(val) {
      //   return this.marks[val]
      // },
    },
    {
      nameInDb: 'bulimia_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Dementia
    //---------------------
    {
      nameInDb: 'dementia_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Suicide Assessment
    //---------------------
    {
      nameInDb: 'suicide_ideations',
      nameInUi: 'Does patient report suicidal ideations ?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      compactDisplay: true,
      style: 'padding: 20px; grid-column: span 3;',
    },
    {
      nameInDb: 'suicide_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------

    //Homicide Assessment
    //---------------------
    {
      nameInDb: 'homicide_ideations',
      nameInUi: 'Does patient report homicidal ideations ?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      compactDisplay: true,
      style: 'padding: 20px; grid-column: span 3;',
    },
    {
      nameInDb: 'homicide_note',
      nameInUi: 'Note',
      type: 'tribute-editor',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
    //---------------------
  ],
  showReviewedButtonInForm: false,
  showResetFormButton: false,
  showDeleteButtonInForm: false,
  showFilterBySearchInAddForm: false,
  maxNumberOfTemporallyValidRows: 1,
  cacheOfMasterListOfSelectOptions: {},

  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem',
  // ctrlPlacementOfEveryRowInViewNote: 'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; column-gap: 1rem;',

  ctrlPlacementOfEveryRowInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryFieldsNameAndValueInViewNote: 'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
    'subjective',
  ],
  validationsObj: {
    value: {
      subjective: {
        minLength: minLength(5),
      },
    },
  },

  fnCreated: function (pRow) {
    // Goal: When it starts i need to initialize value with the initial slider value
    // At start this gets called with empty pRow so I return an empty array
    if (pRow.length < 1) {
      return []
    } else {
      return pRow[0]
    }
  },
  fnGetSelectOptionLabel: function (pFieldNameInDb, pfieldValue) {
    if (pfieldValue === '') return

    // from numbers get the labels

    let arOfAllSelectOptions = psychReviewOfSystemsAllSelectOptionsTbl
      .query()
      .where('psychReviewOfSystemFieldNameInDb', pFieldNameInDb)
      .where('psychReviewOfSystemFieldOptionId', pfieldValue)
      .get()

    const optionIdToLabel = arOfAllSelectOptions[0]['psychReviewOfSystemFieldOptionLabel']

    return optionIdToLabel
  },

  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {
    let masterListOfSelectOptionsForAField = prosEachFieldAllSelectOptions[fieldNameInDb]
    // get the value for this field in patient table
    let row = psychReviewOfSystemsForPatientTbl.find(pclientSideUniqRowId)
    let selectedIDs = row[fieldNameInDb]

    var selectDropDown = []

    for (var i = 0; i < masterListOfSelectOptionsForAField.length; i++) {
      selectDropDown[i] = new Array()
      const fieldOptionId = '#' + masterListOfSelectOptionsForAField[i]['label'].replace(/ /g, '_') + '#' // # is the seperator charecter so toggle can work. Look inside manage-rows
      selectDropDown[i]['id'] = fieldOptionId
      selectDropDown[i]['value'] = masterListOfSelectOptionsForAField[i]['label']
      if (selectedIDs) {
        selectDropDown[i]['selected'] = selectedIDs.includes(fieldOptionId) ? true : false
      }
    }

    /* run custom rules to remove selected options. The data structure is:
            $id: "#0#"
            ROW_END: 2147483648000
            fieldNameInDb: "constitutional_systems_select"
            fieldOptionId: "#0#"
            fieldOptionLabel: "Change in appetite"
            id: "#0#"
            isValidationError: false
            selected: true
            value: "Change in appetite"
            vnRowStateInSession: 1
  */
    var userHasSelectedNone = false

    for (var i = 0; i < selectDropDown.length; i++) {
      if (selectDropDown[i]['value'] === 'None' && selectDropDown[i]['selected'] === true) {
        userHasSelectedNone = true
      }
    }

    if (userHasSelectedNone) {
      var i = selectDropDown.length
      // for reasons of using while see: https://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop
      while (i--) {
        if (selectDropDown[i]['value'] === 'None' && selectDropDown[i]['selected'] === true) {
        } else {
          selectDropDown.splice(i, 1)
        }
      }
    }

    return selectDropDown
  },
}
