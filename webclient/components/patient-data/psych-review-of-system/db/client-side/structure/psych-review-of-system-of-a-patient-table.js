// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'

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

      depressive_mood: this.number(0),
      depressive_interest: this.number(0),
      depressive_sleep: this.number(0),
      depressive_esteem: this.number(0),
      depressive_energy: this.number(0),
      depressive_conc: this.number(0),
      depressive_appetite: this.number(0),
      depressive_retardation: this.number(0),
      depressive_suicidal: this.number(0),

      gateway_depressed: this.number(0),
      gateway_energetic: this.number(0),
      gateway_interest: this.number(0),
      gateway_mood: this.number(0),
      gateway_irritable: this.number(0),
      gateway_difficult: this.number(0),

      mania_mood: this.number(0),
      mania_irritable: this.number(0),
      mania_energy: this.number(0),
      mania_sleep: this.number(0),
      mania_talking: this.number(0),
      mania_racing: this.number(0),
      mania_distractability: this.number(0),
      mania_risk: this.number(0),

      obese: this.number(0),
      thinCachectic: this.number(0),
      disheveledUnkempt: this.number(0),
      malodorous: this.number(0),

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
    internal: 1,
    min: -1,
    max: 2,
  },
  fieldsDef: [
    {
      nameInDb: 'subjective',
      nameInUi: 'Subjective',
      type: 'tribute-editor',
      showLabel: false,
      // Everwhere the content is in grid and I want to take the whole width availabnle inside the grid cell

      style: 'padding: 20px; grid-column-start: 1;grid-column-end: 4',
    },
    {
      nameInDb: 'depressive_mood',
      nameInUi: 'Depressive mood',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'depressive_interest',
      nameInUi: 'Interest',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'depressive_sleep',
      nameInUi: 'Sleep',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'depressive_esteem',
      nameInUi: 'Gulf / Self esteem',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'depressive_energy',
      nameInUi: 'Energy',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'depressive_conc',
      nameInUi: 'Conc/Dist',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'depressive_appetite',
      nameInUi: 'Apptetite',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'depressive_retardation',
      nameInUi: 'PMR/PMA',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'depressive_suicidal',
      nameInUi: 'Suicidal ideation',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },

    {
      nameInDb: 'gateway_depressed',
      nameInUi: 'Felt depressed',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'gateway_energetic',
      nameInUi: 'Low interest or motivation',
      type: 'vertical-slider',
      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'gateway_interest',
      nameInUi: 'Abnormally irritable',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'gateway_mood',
      nameInUi: 'Abnormally energetic',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'gateway_irritable',
      nameInUi: 'Abnormal mood',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'gateway_difficult',
      nameInUi: 'Difficult do the above symptoms',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },

    {
      nameInDb: 'mania_mood',
      nameInUi: 'Mood elevation',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'mania_irritable',
      nameInUi: 'Irritable',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'mania_energy',
      nameInUi: 'Energy',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'mania_sleep',
      nameInUi: 'Sleep',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'mania_talking',
      nameInUi: 'Talking',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'mania_racing',
      nameInUi: 'Racing',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'mania_distractability',
      nameInUi: 'distractability',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'mania_risk',
      nameInUi: 'Risk',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },

    {
      nameInDb: 'obese',
      nameInUi: 'Obese',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'thinCachectic',
      nameInUi: 'Thin or cachectic',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'disheveledUnkempt',
      nameInUi: 'Disheveled/unkempt',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
    {
      nameInDb: 'malodorous',
      nameInUi: 'Malodorous',
      type: 'vertical-slider',

      style: 'padding: 20px',
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not evaluated',
        1: 'Not present',
        2: 'Sub-syndromal',
        3: 'Syndromal',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
    },
  ],
  showReviewedButtonInForm: false,
  showResetFormButton: false,

  maxNumberOfTemporallyValidRows: 1,
  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryRowInViewNote: 'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; column-gap: 1rem;',

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
    'subjective',
    'depressive_mood',
    'interest',
    'sleep',
    'selfEsteem',
    'energy',
    'concDist',
    'appetite',
    'pmrPma',
    'obese',
    'thinCachectic',
    'disheveledUnkempt',
    'malodorous',
  ],
  validationsObj: {
    value: {
      depressive_mood: {
        minLength: minLength(0),
      },
      interest: {
        minLength: minLength(0),
      },
      sleep: {
        minLength: minLength(0),
      },
      selfEsteem: {
        minLength: minLength(0),
      },
      energy: {
        minLength: minLength(0),
      },
      concDist: {
        minLength: minLength(0),
      },
      appetite: {
        minLength: minLength(0),
      },
      pmrPma: {
        minLength: minLength(0),
      },
      obese: {
        minLength: minLength(0),
      },
      thinCachectic: {
        minLength: minLength(0),
      },
      disheveledUnkempt: {
        minLength: minLength(0),
      },
      malodorous: {
        minLength: minLength(0),
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
}
