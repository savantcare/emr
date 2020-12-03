// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import medicalReviewOfSystemMasterClass from './medical-review-of-system-all-select-options.js'
import medicalReviewOfSystemAllSelectOptionsTbl from './medical-review-of-system-all-select-options.js'
import medicalReviewOfSystemOfAPatientTbl from '~/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class medicalReviewOfSystemForPatientClass extends clientTblManage {
  static entity = 'tblMedicalReviewOfSystemOfPatient'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/medical-review-of-system/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),

      /* This field is used to store the value of tblMedicalReviewOfSystemAllSelectOptions/medicalReviewOfSystemFieldOptionId
         E.g: The  tblMedicalReviewOfSystemAllSelectOptions has:
         medicalReviewOfSystemFieldOptionId  |         medicalReviewOfSystemFieldOptionLabel    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table medicalReviewOfSystemFieldOptionId = 2 */
      constitutional_systems_select: this.string(null).nullable(),
      skin_conditions_select: this.string(null).nullable(),
      allergies_select: this.string(null).nullable(),
      ear_nose_mouth_throat_select: this.string(null).nullable(),
      eyes_head_select: this.string(null).nullable(),
      respiratory_select: this.string(null).nullable(),
      cardiovascular_select: this.string(null).nullable(),
      gastrointestinal_select: this.string(null).nullable(),
      urinary_select: this.string(null).nullable(),
      endocrine_select: this.string(null).nullable(),
      musculoskeletal_select: this.string(null).nullable(),
      neurological_select: this.string(null).nullable(),
      psychological_select: this.string(null).nullable(),
      heme_lymphatic_select: this.string(null).nullable(),
      any_other_signs_symptoms: this.string(null).nullable(),
      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const medicalReviewOfSystemFormDef = {
  id: 'medical_review_of_system',
  plural: 'medical review of system',
  singular: 'medical review of system',
  fieldsDef: [
    {
      nameInUi: 'Have you recently noticed any of the following?',
      type: 'heading',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3',
    },
    {
      nameInDb: 'constitutional_systems_select',
      nameInUi: '1. Constitutional systems:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'skin_conditions_select',
      nameInUi: '2. Skin conditions:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'allergies_select',
      nameInUi: '3. Allergies:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'ear_nose_mouth_throat_select',
      nameInUi: '4. Ears/Nose/Mouth Throat:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'eyes_head_select',
      nameInUi: '5. Eyes/Head:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'respiratory_select',
      nameInUi: '6. Respiratory:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'cardiovascular_select',
      nameInUi: '7. Cardiovascular:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'gastrointestinal_select',
      nameInUi: '8. Gastrointestinal:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'urinary_select',
      nameInUi: '9. Urinary:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },

    {
      nameInDb: 'endocrine_select',
      nameInUi: '10. Endocrine:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'musculoskeletal_select',
      nameInUi: '11. Musculoskeletal:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'neurological_select',
      nameInUi: '12. Neurological:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'psychological_select',
      nameInUi: '13. Psychological:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },

    {
      nameInDb: 'heme_lymphatic_select',
      nameInUi: '14. Heme/Lymphatic:',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'any_other_signs_symptoms',
      nameInUi: '15. Do you have any other signs, symptoms or problems other than above? If yes, please explain',
      type: 'textarea',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; font-weight: bold',
    },
  ],
  showReviewedButtonInForm: false,
  showResetFormButton: false,
  showFilterBySearchInAddForm: true,
  maxNumberOfTemporallyValidRows: 1,
  cacheOfMasterListOfSelectOptions: {},

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
    'recently_noticed_select',
    'constitutional_systems_select',
    'skin_conditions_select',
  ],
  validationsObj: {
    value: {
      recently_noticed_select: {
        minLength: minLength(1),
      },
      constitutional_systems_select: {
        minLength: minLength(8),
      },
      skin_conditions_select: {
        minLength: minLength(8),
      },
    },
  },

  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryFieldsNameAndValueInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr  1fr 1fr; grid-column-gap: .1rem; grid-row-gap: .1rem',
  ctrlPlacementOfEveryRowInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',

  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {
    let masterListOfSelectOptionsForAField = []
    if (!this.cacheOfMasterListOfSelectOptions[fieldNameInDb]) {
      masterListOfSelectOptionsForAField = medicalReviewOfSystemAllSelectOptionsTbl
        .query()
        .where('ROW_END', 2147483648000)
        .where('fieldNameInDb', fieldNameInDb)
        .get()
      this.cacheOfMasterListOfSelectOptions[fieldNameInDb] = masterListOfSelectOptionsForAField
    } else {
      masterListOfSelectOptionsForAField = this.cacheOfMasterListOfSelectOptions[fieldNameInDb]
    }
    // get the value for this field in patient table
    let row = medicalReviewOfSystemOfAPatientTbl.find(pclientSideUniqRowId)
    let selectedIDs = row[fieldNameInDb]

    var selectDropDown = []

    for (var i = 0; i < masterListOfSelectOptionsForAField.length; i++) {
      selectDropDown[i] = new Array()
      selectDropDown[i]['id'] = masterListOfSelectOptionsForAField[i]['fieldOptionId']
      selectDropDown[i]['value'] = masterListOfSelectOptionsForAField[i]['fieldOptionLabel']
      if (selectedIDs) {
        selectDropDown[i]['selected'] = selectedIDs.includes(masterListOfSelectOptionsForAField[i]['fieldOptionId'])
          ? true
          : false
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
  fnGetSelectOptionLabel: function (pFieldNameInDb, pfieldValue) {
    if (pfieldValue === '') return

    // from numbers get the labels

    let arOfAllSelectOptions = medicalReviewOfSystemAllSelectOptionsTbl
      .query()
      .where('fieldNameInDb', pFieldNameInDb)
      .where('fieldOptionId', pfieldValue)
      .get()

    const optionIdToLabel = arOfAllSelectOptions[0]['fieldOptionLabel']

    return optionIdToLabel
  },
}
