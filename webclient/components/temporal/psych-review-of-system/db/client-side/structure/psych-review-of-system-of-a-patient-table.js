// For docs read webclient/docs/models.md
import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
import psychReviewOfSystemsAllSelectOptionsTbl from './psych-review-of-system-all-select-options.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class psychReviewOfSystemsForPatientClass extends clientTblManage {
  static entity = 'tblPsychReviewOfSystemsOfPatient'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/psych-review-of-system/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),

      /* This field is used to store the value of tblPsychReviewOfSystemsAllSelectOptions/psychReviewOfSystemFieldOptionId
         E.g: The  tblPsychReviewOfSystemsAllSelectOptions has:
         psychReviewOfSystemFieldOptionId  |         psychReviewOfSystemFieldOptionLabel    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table psychReviewOfSystemFieldOptionId = 2 */
      depressive_mood: this.number(0),
      interest: this.number(0),
      sleep: this.number(0),
      selfEsteem: this.number(0),
      energy: this.number(0),
      concDist: this.number(0),
      appetite: this.number(0),
      pmrPma: this.number(0),
      obese: this.number(0),
      thinCachectic: this.number(0),
      disheveledUnkempt: this.number(0),
      malodorous: this.number(0),
      /* Heading fields need default values since there is a empty check on these in content-during-appt-of-a-single-ct.vue. 
          The empty check is there to decide if a div should be included in DOM or not. Since Div is used by css:grid.
          If a grid withput content is included then there will be a empty box in the paper note */
      heading_gateway: this.string('heading_gateway'),
      heading_depression: this.string('heading_depression'),

      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliseconds is used.
    }
  }
}

export const psychReviewOfSystemFormDef = {
  id: 'psych_review_of_system',
  plural: 'pysch review of system',
  singular: 'pysch review of system',
  fieldsDef: [
    {
      fieldNameInDb: 'heading_depression',
      fieldNameInUi: 'Depression',
      fieldType: 'heading',
      showFieldLabel: true,
      // Everwhere the content is in grid and I want to take the whole width availabnle inside the grid cell
      span: 24,
      fieldStyle: 'padding: 20px',
    },
    {
      fieldNameInDb: 'depressive_mood',
      fieldNameInUi: 'Depressive mood',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'interest',
      fieldNameInUi: 'Interest',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'sleep',
      fieldNameInUi: 'Sleep',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'selfEsteem',
      fieldNameInUi: 'Gulf / Self esteem',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'energy',
      fieldNameInUi: 'Energy',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'concDist',
      fieldNameInUi: 'Conc/Dist',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'appetite',
      fieldNameInUi: 'Apptetite',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'pmrPma',
      fieldNameInUi: 'PMR/PMA',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'heading_gateway',
      fieldNameInUi: 'Gateway mood symptoms',
      fieldType: 'heading',
      showFieldLabel: true,
      span: 12,
    },
    {
      fieldNameInDb: 'obese',
      fieldNameInUi: 'Obese',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'thinCachectic',
      fieldNameInUi: 'Thin or cachectic',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'disheveledUnkempt',
      fieldNameInUi: 'Disheveled/unkempt',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
      fieldNameInDb: 'malodorous',
      fieldNameInUi: 'Malodorous',
      fieldType: 'slider',
      span: 24,
      fieldStyle: 'padding: 20px',
      showFieldLabel: true,
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
  showFormReviewedButton: false,
  maxNumberOfTemporallyValidRows: 1,
  styleForEachRowInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem',

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
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
