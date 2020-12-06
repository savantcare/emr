// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'

var examEachFieldAllSelectOptions = require('../static-data/insert-into-examination-all-select-options.js')
  .examEachFieldAllSelectOptions

import examinationOfAPatientTbl from '~/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class examinationForPatientClass extends clientTblManage {
  static entity = 'tblExamination'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/examination/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),

      /* This field is used to store the value of tblExaminationAllSelectOptions/fieldOptionId
         E.g: The  tblExaminationAllSelectOptions has:
         fieldOptionId  |         fieldOptionLabel    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table fieldOptionId = 2 */
      appearance_multi_select: this.string(null).nullable(),
      attitude_multi_select: this.string(null).nullable(),
      psychomotor_multi_select: this.string(null).nullable(),
      eye_contact_multi_select: this.string(null).nullable(),
      speech_multi_select: this.string(null).nullable(),
      mood_affect_multi_select: this.string(null).nullable(),
      thought_content_multi_select: this.string(null).nullable(),
      perceptions_multi_select: this.string(null).nullable(),
      thought_process_multi_select: this.string(null).nullable(),
      constitutional_multi_select: this.string(null).nullable(),
      cognition_multi_select: this.string(null).nullable(),
      insight_multi_select: this.string(null).nullable(),
      judgement_multi_select: this.string(null).nullable(),
      impulse_control_multi_select: this.string(null).nullable(),
      neurological_multi_select: this.string(null).nullable(),

      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const examinationFormDef = {
  id: 'examination',
  plural: 'examination',
  singular: 'examination',
  fieldsDef: [
    {
      nameInUi: 'Constitutional',
      type: 'heading',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; text-align: center',
    },
    {
      nameInDb: 'appearance_multi_select',
      nameInUi: 'Appearance',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInUi: 'Musculoskeletal',
      type: 'heading',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; text-align: center',
    },
    {
      nameInDb: 'neurological_multi_select',
      nameInUi: 'Neurological',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInUi: 'Psychiatric',
      type: 'heading',
      showLabel: true,
      style: 'padding: 20px; grid-column: span 3; text-align: center',
    },
    {
      nameInDb: 'attitude_multi_select',
      nameInUi: 'Attitude',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'psychomotor_multi_select',
      nameInUi: 'Psychomotor',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'eye_contact_multi_select',
      nameInUi: 'Eye contact',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'speech_multi_select',
      nameInUi: 'Speech',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'mood_affect_multi_select',
      nameInUi: 'Mood affect',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'thought_content_multi_select',
      nameInUi: 'Thought content',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'perceptions_multi_select',
      nameInUi: 'Perceptions',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'thought_process_multi_select',
      nameInUi: 'Thought process',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'constitutional_multi_select',
      nameInUi: 'Constitutional',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'cognition_multi_select',
      nameInUi: 'Cognition',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'insight_multi_select',
      nameInUi: 'Insight',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'judgement_multi_select',
      nameInUi: 'Judgement',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'impulse_control_multi_select',
      nameInUi: 'Impulse control',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
  ],
  showReviewedButtonInForm: false,
  showResetFormButton: false,
  showFilterBySearchInAddForm: true,
  maxNumberOfTemporallyValidRows: 1,
  cacheOfMasterListOfSelectOptions: {},
  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryRowInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['appearance_select', 'attitude_multi_select', 'psychomotor_select'],
  validationsObj: {
    value: {
      appearance_select: {
        minLength: minLength(1),
      },
      attitude_multi_select: {
        minLength: minLength(8),
      },
      psychomotor_select: {
        minLength: minLength(8),
      },
    },
  },

  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },

  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {
    let masterListOfSelectOptionsForAField = examEachFieldAllSelectOptions[fieldNameInDb]

    // get the value for this field in patient table
    let row = examinationOfAPatientTbl.find(pclientSideUniqRowId)
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
