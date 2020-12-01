// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/crud/manage-rows-of-table-in-client-side-orm.js'
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
      constitutional_systems_select: this.string(''),
      skin_conditions_select: this.string(''),
      allergies_select: this.string(''),
      ear_nose_mouth_throat_select: this.string(''),
      eyes_head_select: this.string(''),
      respiratory_select: this.string(''),
      cardiovascular_select: this.string(''),
      gastrointestinal_select: this.string(''),
      urinary_select: this.string(''),
      endocrine_select: this.string(''),
      musculoskeletal_select: this.string(''),
      neurological_select: this.string(''),
      psychological_select: this.string(''),
      heme_lymphatic_select: this.string(''),
      any_other_signs_symptoms: this.string(''),
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
      nameInUi: 'Q1) Constitutional systems?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'skin_conditions_select',
      nameInUi: 'Q2) Skin conditions?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'allergies_select',
      nameInUi: 'Q3) Allergies - Do you have?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'ear_nose_mouth_throat_select',
      nameInUi: 'Q4) Ears/Nose/Mouth Throat: Have you recently had?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'eyes_head_select',
      nameInUi: 'Q5) Eyes/Head: Have you recently had?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'respiratory_select',
      nameInUi: 'Q6) Respiratory: Do you have?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'cardiovascular_select',
      nameInUi: 'Q7) Cardiovascular: Do you have?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'gastrointestinal_select',
      nameInUi: 'Q8) Gastrointestinal: Do you have?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'urinary_select',
      nameInUi: 'Q9) Urinary: Do you have?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },

    {
      nameInDb: 'endocrine_select',
      nameInUi: 'Q10) Endocrine: Do you have?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'musculoskeletal_select',
      nameInUi: 'Q11) Musculoskeletal: Do you have?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'neurological_select',
      nameInUi: 'Q12) Neurological: Do you feel?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'psychological_select',
      nameInUi: 'Q13) Psychological: Do you feel?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },

    {
      nameInDb: 'heme_lymphatic_select',
      nameInUi: 'Q14) Heme/Lymphatic: Do you?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'any_other_signs_symptoms',
      nameInUi: 'Q15) Do you have any other signs, symptoms or problems other than above? If yes, please explain',
      type: 'textarea',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3',
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
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: .1rem; grid-row-gap: .1rem',
  ctrlPlacementOfEveryRowInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',

  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {
    let arOfAllSelectOptions = []
    if (!this.cacheOfMasterListOfSelectOptions[fieldNameInDb]) {
      arOfAllSelectOptions = medicalReviewOfSystemAllSelectOptionsTbl
        .query()
        .where('ROW_END', 2147483648000)
        .where('fieldNameInDb', fieldNameInDb)
        .get()
      this.cacheOfMasterListOfSelectOptions[fieldNameInDb] = arOfAllSelectOptions
    } else {
      arOfAllSelectOptions = this.cacheOfMasterListOfSelectOptions[fieldNameInDb]
    }
    // get the value for this field in patient table
    let row = medicalReviewOfSystemOfAPatientTbl.find(pclientSideUniqRowId)
    let selectedIDs = row[fieldNameInDb]

    arOfAllSelectOptions.forEach(function (data) {
      data['id'] = data['fieldOptionId']
      data['value'] = data['fieldOptionLabel']
      data['selected'] = selectedIDs.includes(data['id']) ? true : false
    })

    return arOfAllSelectOptions
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
