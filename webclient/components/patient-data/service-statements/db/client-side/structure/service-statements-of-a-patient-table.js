// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
var serviceStatementsEachFieldAllSelectOptions = require('../static-data/create-obj-for-each-field-of-service-statements-all-select-options.js')
  .serviceStatementsEachFieldAllSelectOptions
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

      /* This field is used to store the value of tblServiceStatementsAllSelectOptions/fieldOptionId
         E.g: The  tblServiceStatementsAllSelectOptions has:
         fieldOptionId  |         fieldOptionLabel    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table fieldOptionId = 2 */
      total_minutes_in_psychotherapy: this.string(null).nullable(),
      total_minutes_with_patient: this.string(null).nullable(),
      modality_of_psychotherapy_multi_select: this.string(null).nullable(),
      review_of_systems_multi_select: this.string(null).nullable(),
      optional_multi_select: this.string(null).nullable(),
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
      style: 'padding: 20px; grid-column: 1/2',
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
      style: 'padding: 20px; grid-column: 2/2; grid-row: 2/6',
    },
  ],
  showReviewedButtonInForm: false,
  showResetFormButton: false,
  showFilterBySearchInAddForm: true,
  maxNumberOfTemporallyValidRows: 1,
  cacheOfMasterListOfSelectOptions: {},
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
    let masterListOfSelectOptionsForAField = serviceStatementsEachFieldAllSelectOptions[fieldNameInDb]
    // get the value for this field in patient table
    let row = serviceStatementsOfAPatientTbl.find(pclientSideUniqRowId)
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
