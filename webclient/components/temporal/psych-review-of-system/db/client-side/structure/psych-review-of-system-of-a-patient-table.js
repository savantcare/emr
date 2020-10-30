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

      /* This field is used to store the value of tblPsychReviewOfSystemsAllSelectOptions/serviceStatementFieldOptionId
         E.g: The  tblPsychReviewOfSystemsAllSelectOptions has:
         serviceStatementFieldOptionId  |         serviceStatementFieldOptionLabel    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table serviceStatementFieldOptionId = 2 */
      total_minutes_in_psychotherapy_select: this.string(''),
      total_minutes_with_patient_select: this.string(''),
      modality_of_psychotherapy_multi_select: this.string(''),

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
      fieldNameInDb: 'total_minutes_in_psychotherapy_select',
      fieldNameInUi: 'Total minutes in psychotherapy',
      fieldType: 'multi-select-with-buttons',
      span: 12,
    },
    {
      fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      fieldNameInUi: 'Modality of psychotherapy',
      fieldType: 'multi-select-with-buttons',
      span: 12,
    },
    {
      fieldNameInDb: 'total_minutes_with_patient_select',
      fieldNameInUi: 'Total minutes with patient',
      fieldType: 'multi-select-with-buttons',
      span: 12,
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
    console.log('===== inside fn')
    let arOfAllSelectOptions = psychReviewOfSystemsAllSelectOptionsTbl
      .query()
      .where('ROW_END', 2147483648000)
      .where('serviceStatementFieldNameInDb', fieldNameInDb)
      .get()

    // get the value for this field in patient table
    let row = psychReviewOfSystemsOfAPatientTbl.find(pclientSideUniqRowId)
    let selectedIDs = row[fieldNameInDb]

    arOfAllSelectOptions.forEach(function (data) {
      data['id'] = data['serviceStatementFieldOptionId']
      data['value'] = data['serviceStatementFieldOptionLabel']
      data['selected'] = selectedIDs.includes(data['id']) ? true : false
    })
    console.log(arOfAllSelectOptions)

    return arOfAllSelectOptions
  },
  fnGetSelectOptionLabel: function (pFieldNameInDb, pfieldValue) {
    if (pfieldValue === '') return

    // from numbers get the labels

    let arOfAllSelectOptions = psychReviewOfSystemsAllSelectOptionsTbl
      .query()
      .where('serviceStatementFieldNameInDb', pFieldNameInDb)
      .where('serviceStatementFieldOptionId', pfieldValue)
      .get()

    const optionIdToLabel = arOfAllSelectOptions[0]['serviceStatementFieldOptionLabel']

    return optionIdToLabel
  },
}
