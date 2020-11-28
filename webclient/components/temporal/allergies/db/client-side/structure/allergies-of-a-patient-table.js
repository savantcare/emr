// For docs read webclient/docs/models.md
import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class allergies extends clientTblManage {
  static entity = 'tblAllergies'

  /* 
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/allergies/getAll

    To make post request:
    enter http://127.0.0.1:8000/allergies/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/allergies'

  */

  static apiUrl = process.env.baseUrlForLumen + '/public/api/allergies/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      allergen: this.string(''),
      reaction: this.string(''),
      onset: this.string(''),
      notes: this.string(null).nullable(), // Ref: https://vuex-orm.org/guide/model/defining-models.html#primitive-types. Without specifying .null notes gets the default value of "null",
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const allergiesFormDef = {
  id: 'allergies',
  plural: 'allergies',
  singular: 'allergy',
  fieldsDef: [
    { nameInDb: 'allergen', fieldNameInUi: 'Allergen', fieldType: 'text', span: 24 },
    { nameInDb: 'reaction', fieldNameInUi: 'Reaction', fieldType: 'text', span: 24 },
    { nameInDb: 'onset', fieldNameInUi: 'Onset', fieldType: 'text', span: 24 },
  ],
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['allergen'],
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  showReviewedButtonInForm: false,
  showAddMoreButtonInForm: false,
  showResetFormButton: false,

  styleForEachRowInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 4fr 4fr 4fr 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryFieldsNameAndValueInsideADiv:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem; grid-row-gap: .1rem',
  ctrlPlacementOfEveryRowInsideADiv:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',

  validationsObj: {
    value: {
      allergen: {
        minLength: minLength(8),
      },
      reaction: {
        minLength: minLength(8),
      },
      onset: {
        minLength: minLength(8),
      },
    },
  },
}
