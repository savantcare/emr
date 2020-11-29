// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/crud/manage-rows-of-table-in-client-side-orm.js'
import serviceStatementsAllSelectOptionsTbl from './service-statements-all-select-options.js'
import serviceStatementsOfAPatientTbl from '~/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class serviceStatementsForPatientClass extends clientTblManage {
  static entity = 'tblServiceStatementsOfPatient'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/service-statements/v20'

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
      total_minutes_in_psychotherapy: this.string(''),
      total_minutes_with_patient: this.string(''),
      modality_of_psychotherapy_multi_select: this.string(''),
      review_of_systems_multi_select: this.string(''),
      optional_multi_select: this.string(''),
      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const serviceStatementsFormDef = {
  id: 'service_statements',
  plural: 'service statements',
  singular: 'service statement',
  fieldsDef: [
    {
      nameInDb: 'total_minutes_in_psychotherapy', // _select is important since it is used by curd/manage-rows to decide append or replace. Since default behavior of curd/manage-rows is to replace.
      nameInUi: 'Total minutes in psychotherapy',
      type: 'number',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'total_minutes_with_patient',
      nameInUi: 'Total minutes with patient',
      type: 'number',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'modality_of_psychotherapy_multi_select',
      nameInUi: 'Modality of psychotherapy',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'review_of_systems_multi_select',
      nameInUi: 'Review of systems',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'optional_multi_select',
      nameInUi: 'Optional',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
  ],
  showReviewedButtonInForm: false,
  showResetFormButton: false,

  maxNumberOfTemporallyValidRows: 1,

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
    'total_minutes_in_psychotherapy',
    'modality_of_psychotherapy_multi_select',
    'total_minutes_with_patient',
  ],
  validationsObj: {
    value: {
      total_minutes_in_psychotherapy_select: {
        minLength: minLength(1),
      },
      modality_of_psychotherapy_multi_select: {
        minLength: minLength(8),
      },
      total_minutes_with_patient_select: {
        minLength: minLength(8),
      },
    },
  },
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryFieldsNameAndValueInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: .1rem; grid-row-gap: .1rem',
  ctrlPlacementOfEveryRowInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',

  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {
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
      if (selectedIDs) {
        data['selected'] = selectedIDs.includes(data['id']) ? true : false
      } else {
        data['selected'] = false
      }
    })

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
