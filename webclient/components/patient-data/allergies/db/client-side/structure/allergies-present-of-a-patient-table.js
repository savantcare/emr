// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class allergiesPresentClientTbl extends clientTblManage {
  static entity = 'tblAllergiesPresent'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/allergies-present/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      present: this.string('"#Not_evaluated#"').nullable(),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is used by mf_get_ar_of_data_rows inside add-form.vue. In this table it is not useful but still keeping it so I can use template code.
    }
  }
}

export const allergiesPresentFormDef = {
  id: 'allergies_present',
  plural: 'allergies present',
  singular: 'allergy present',
  fieldsDef: [
    {
      nameInDb: 'present',
      nameInUi: 'Allergies?',
      type: 'multi-select-with-buttons',
      showLabel: true,
      compactDisplay: true,
    },
  ],
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['present'],
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  showReviewedButtonInForm: false,
  showResetFormButton: false,
  maxNumberOfTemporallyValidRows: 1,
  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {

    let masterListOfSelectOptionsForAField = [
      { label: 'Yes' },
      { label: 'No known drug allergies' },
      { label: 'Not evaluated' },
    ]

    let row = allergiesPresentClientTbl.find(pclientSideUniqRowId)
    let selectedIDs = null
    if(row && row[fieldNameInDb]){
      selectedIDs = row[fieldNameInDb]
    }

    var selectDropDown = []
    for (var i = 0; i < masterListOfSelectOptionsForAField.length; i++) {
      selectDropDown[i] = new Array()

      const fieldOptionId = '#' + masterListOfSelectOptionsForAField[i]['label'].replace(/ /g, '_') + '#'
      selectDropDown[i]['id'] = fieldOptionId
      selectDropDown[i]['value'] = masterListOfSelectOptionsForAField[i]['label']
      if (selectedIDs) {
        selectDropDown[i]['selected'] = selectedIDs.includes(fieldOptionId) ? true : false
      }
    }
    return selectDropDown
  },
}
