// For docs read webclient/docs/models.md
import clientTblManage from '~/components/framework/crud/manage-rows-of-table-in-client-side-orm.js'
import psychReviewOfSystemsMasterClass from './psych-review-of-system-all-select-options.js'
import psychReviewOfSystemsAllSelectOptionsTbl from './psych-review-of-system-all-select-options.js'
import psychReviewOfSystemsOfAPatientTbl from '~/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class psychReviewOfSystemsForPatientClass extends clientTblManage {
  static entity = 'tblPsychReviewOfSystemsOfPatient'

  static apiUrl = 'http://localhost:8000/public/api/psych-review-of-system/v20'

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
      depressive_mood: this.string(''),
      interest: this.string(''),
      sleep: this.string(''),
      selfEsteem: this.string(''),
      energy: this.string(''),
      concDist: this.string(''),
      appetite: this.string(''),
      pmrPma: this.string(''),
      obese: this.string(''),
      thinCachectic: this.string(''),
      disheveledUnkempt: this.string(''),
      malodorous: this.string(''),

      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
    }
  }
}

export const psychReviewOfSystemFormDef = {
  id: 'psych_review_of_system',
  plural: 'pysch review of system',
  singular: 'pysch review of system',
  fieldsDef: [
    {
      fieldNameInDb: '',
      fieldNameInUi: 'Depression',
      fieldType: 'heading',
      span: 12,
    },
    {
      fieldNameInDb: 'depressive_mood',
      fieldNameInUi: 'Depressive mood',
      fieldType: 'slider',
      span: 8,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'interest',
      fieldNameInUi: 'Interest',
      fieldType: 'slider',
      span: 8,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'sleep',
      fieldNameInUi: 'Sleep',
      fieldType: 'slider',
      span: 8,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'selfEsteem',
      fieldNameInUi: 'Gulf / Self esteem',
      fieldType: 'slider',
      span: 12,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'energy',
      fieldNameInUi: 'Energy',
      fieldType: 'slider',
      span: 12,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'concDist',
      fieldNameInUi: 'Conc/Dist',
      fieldType: 'slider',
      span: 12,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'appetite',
      fieldNameInUi: 'Apptetite',
      fieldType: 'slider',
      span: 12,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'pmrPma',
      fieldNameInUi: 'PMR/PMA',
      fieldType: 'slider',
      span: 12,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: '',
      fieldNameInUi: 'Gateway mood symptoms',
      fieldType: 'heading',
      span: 12,
    },
    {
      fieldNameInDb: 'obese',
      fieldNameInUi: 'Obese',
      fieldType: 'slider',
      span: 12,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'thinCachectic',
      fieldNameInUi: 'Thin or cachectic',
      fieldType: 'slider',
      span: 12,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'disheveledUnkempt',
      fieldNameInUi: 'Disheveled/unkempt',
      fieldType: 'slider',
      span: 12,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
    {
      fieldNameInDb: 'malodorous',
      fieldNameInUi: 'Malodorous',
      fieldType: 'slider',
      span: 12,
      fieldOptions: { min: 0, max: 1, step: 0.5 },
    },
  ],
  showFormReviewedButton: false,
  maxNumberOfRows: 1,

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
    'total_minutes_in_psychotherapy_select',
    'modality_of_psychotherapy_multi_select',
    'total_minutes_with_patient_select',
  ],

  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {
    const a = [0, 1, 2]
    return a
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
