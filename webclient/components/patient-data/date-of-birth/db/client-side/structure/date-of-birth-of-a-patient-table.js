// For ref implementation see name/db/structure/table.js
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class date_of_birth extends clientTblManage {
  static entity = 'tblDateOfBirth'
  static apiUrl = process.env.baseUrlForLumen + '/public/api/date-of-birth/v20'

  static graphSeries1FieldName = 'dateOfBirthInMilliseconds'
  static graphSeries1Unit = 'Lbs'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()),
      serverSideRowUuid: this.uid(() => uuidv1()),

      dateOfBirthInMilliseconds: this.uid(() => defaultValueOfOnsetInMilliSecs()), // For date decision see name/db/structure/table.js;
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000),
    }
  }
}

export const dateOfBirthFormDef = {
  id: 'date_of_birth',
  plural: 'dob',
  singular: 'dob',
  fieldsDef: [
    //{ nameInDb: 'description', nameInUi: 'Description', showLabel: false, type: 'text', showHistory: 'always' },
    {
      nameInDb: 'dateOfBirthInMilliseconds',
      nameInUi: 'DOB',
      showLabel: false,
      type: 'date',
      showHistory: 'always',
    },
  ],
  showReviewedButtonInForm: false,
  showResetFormButton: false,
  showDeleteButtonInForm: false,

  maxNumberOfTemporallyValidRows: 1,
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['description'],
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },

  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryFieldsNameAndValueInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryRowInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',
  styleForBoxInPaperTypeView: 'display: grid; grid-template-columns: 1fr 3fr; align-items: top',
}
