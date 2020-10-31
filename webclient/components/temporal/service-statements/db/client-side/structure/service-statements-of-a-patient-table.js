// For docs read webclient/docs/models.md
import clientTblManage from '~/components/framework/crud/manage-rows-of-table-in-client-side-orm.js'
import serviceStatementsAllSelectOptionsTbl from './service-statements-all-select-options.js'
import serviceStatementsOfAPatientTbl from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class serviceStatementsForPatientClass extends clientTblManage {
  static entity = 'tblServiceStatementsOfPatient'

  static apiUrl = 'http://localhost:8000/public/api/service-statements/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),

      /* This field is used to store the value of tblServiceStatementsAllSelectOptions/serviceStatementFieldOptionId
         E.g: The  tblServiceStatementsAllSelectOptions has:
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

export const serviceStatementsFormDef = {
  id: 'service_statements',
  plural: 'service statements',
  singular: 'service statement',
  fieldsDef: [
    {
      fieldNameInDb: 'total_minutes_in_psychotherapy_select',
      fieldNameInUi: 'Total minutes in psychotherapy',
      fieldType: 'multi-select-with-buttons',
      span: 12,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      fieldNameInUi: 'Modality of psychotherapy',
      fieldType: 'multi-select-with-buttons',
      span: 12,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'total_minutes_with_patient_select',
      fieldNameInUi: 'Total minutes with patient',
      fieldType: 'multi-select-with-buttons',
      span: 12,
      showFieldLabel: true,
    },
  ],
  showFormReviewedButton: false,
  maxNumberOfRows: 1,

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
    'total_minutes_in_psychotherapy_select',
    'modality_of_psychotherapy_multi_select',
    'total_minutes_with_patient_select',
  ],
  fnCreated: function () {},

  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {
    console.log('===== inside fn')
    let arOfAllSelectOptions = serviceStatementsAllSelectOptionsTbl
      .query()
      .where('ROW_END', 2147483648000)
      .where('serviceStatementFieldNameInDb', fieldNameInDb)
      .get()

    // get the value for this field in patient table
    let row = serviceStatementsOfAPatientTbl.find(pclientSideUniqRowId)
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

    let arOfAllSelectOptions = serviceStatementsAllSelectOptionsTbl
      .query()
      .where('serviceStatementFieldNameInDb', pFieldNameInDb)
      .where('serviceStatementFieldOptionId', pfieldValue)
      .get()

    const optionIdToLabel = arOfAllSelectOptions[0]['serviceStatementFieldOptionLabel']

    return optionIdToLabel
  },
}
