// For docs read webclient/docs/models.md
import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class screens extends clientTblManage {
  static entity = 'tblScreens'

  /* 
    Screen: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/screens/getAll

    To make post request:
    enter http://127.0.0.1:8000/screens/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/screens'

  */

  static apiUrl = process.env.baseUrlForLumen + '/public/api/screens/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      name: this.string(''),
      notes: this.string(null).nullable(), // Ref: https://vuex-orm.org/guide/model/defining-models.html#primitive-types. Without specifying .null notes gets the default value of "null",
      priority: this.number(0),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const screensFormDef = {
  id: 'screens',
  plural: 'screens',
  singular: 'screen',
  fieldsDef: [
    // Giving span 24 since it is inside div grid and I want to take all available width
    { nameInDb: 'name', fieldNameInUi: 'Description', fieldType: 'textarea', span: 24 },
  ],
  showReviewedButtonInForm: false,
  showAddMoreButtonInForm: false,
  showResetFormButton: false,

  additionalRowActions: [
    {
      textInUi: 'Start',
      executeThisFn: function (pScreenRow) {
        $nuxt.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
          searchTerm: 'add phq9',
        })
      },
    },
  ],
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['name'],
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  styleForEachRowInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 3fr 1fr; grid-column-gap: 1rem',
  validationsObj: {
    value: {
      name: {
        minLength: minLength(8),
      },
    },
  },
}
