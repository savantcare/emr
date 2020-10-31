// For docs read webclient/docs/models.md
import clientTblManage from '~/components/framework/crud/manage-rows-of-table-in-client-side-orm.js'
import mentalStatusExamMasterClass from './mental-status-exam-all-select-options.js'
import mentalStatusExamAllSelectOptionsTbl from './mental-status-exam-all-select-options.js'
import mentalStatusExamOfAPatientTbl from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class mentalStatusExamForPatientClass extends clientTblManage {
  static entity = 'tblMentalStatusExamOfPatient'

  static apiUrl = 'http://localhost:8000/public/api/mental-status-exam/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),

      /* This field is used to store the value of tblMentalStatusExamAllSelectOptions/mentalStatusExamFieldOptionId
         E.g: The  tblMentalStatusExamAllSelectOptions has:
         mentalStatusExamFieldOptionId  |         mentalStatusExamFieldOptionLabel    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table mentalStatusExamFieldOptionId = 2 */
      appearance_select: this.string(''),
      psychomotor_select: this.string(''),
      attitude_multi_select: this.string(''),

      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
    }
  }
}

export const mentalStatusExamFormDef = {
  id: 'mental_status_exam',
  plural: 'mental status exam',
  singular: 'mental status exam',
  fieldsDef: [
    {
      fieldNameInDb: 'appearance_select',
      fieldNameInUi: 'Appearance',
      fieldType: 'multi-select-with-buttons',
      span: 12,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'attitude_multi_select',
      fieldNameInUi: 'Attitude',
      fieldType: 'multi-select-with-buttons',
      span: 12,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'psychomotor_select',
      fieldNameInUi: 'Psychomotor',
      fieldType: 'multi-select-with-buttons',
      span: 12,
      showFieldLabel: true,
    },
  ],
  showFormReviewedButton: false,
  maxNumberOfRows: 1,

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['appearance_select', 'attitude_multi_select', 'psychomotor_select'],
  fnCreated: function () {},

  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {
    console.log('===== inside fn')
    let arOfAllSelectOptions = mentalStatusExamAllSelectOptionsTbl
      .query()
      .where('ROW_END', 2147483648000)
      .where('mentalStatusExamFieldNameInDb', fieldNameInDb)
      .get()

    // get the value for this field in patient table
    let row = mentalStatusExamOfAPatientTbl.find(pclientSideUniqRowId)
    let selectedIDs = row[fieldNameInDb]

    arOfAllSelectOptions.forEach(function (data) {
      data['id'] = data['mentalStatusExamFieldOptionId']
      data['value'] = data['mentalStatusExamFieldOptionLabel']
      data['selected'] = selectedIDs.includes(data['id']) ? true : false
    })
    console.log(arOfAllSelectOptions)

    return arOfAllSelectOptions
  },
  fnGetSelectOptionLabel: function (pFieldNameInDb, pfieldValue) {
    if (pfieldValue === '') return

    // from numbers get the labels

    let arOfAllSelectOptions = mentalStatusExamAllSelectOptionsTbl
      .query()
      .where('mentalStatusExamFieldNameInDb', pFieldNameInDb)
      .where('mentalStatusExamFieldOptionId', pfieldValue)
      .get()

    const optionIdToLabel = arOfAllSelectOptions[0]['mentalStatusExamFieldOptionLabel']

    return optionIdToLabel
  },
}
