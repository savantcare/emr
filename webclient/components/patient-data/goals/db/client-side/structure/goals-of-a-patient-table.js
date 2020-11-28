// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/crud/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class goals extends clientTblManage {
  static entity = 'tblGoals'

  /* 
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/goals/getAll

    To make post request:
    enter http://127.0.0.1:8000/goals/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/goals'

  */

  static apiUrl = process.env.baseUrlForLumen + '/public/api/goals/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      description: this.string(''),
      notes: this.string(null).nullable(), // Ref: https://vuex-orm.org/guide/model/defining-models.html#primitive-types. Without specifying .null notes gets the default value of "null",
      priority: this.number(0),
      rating: this.number(0),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const goalsFormDef = {
  id: 'goals',
  plural: 'goals',
  singular: 'goal',
  fieldsDef: [
    { nameInDb: 'description', nameInUi: 'Description', type: 'textarea' },
    {
      nameInDb: 'rating',
      nameInUi: 'Rating',
      type: 'slider',

      fieldOptions: { min: 0, max: 10, step: 1 },
      style: 'padding: 20px',
    },
  ],
  styleForEachRowInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 3fr 3fr 1fr; grid-column-gap: 1rem',
  showReviewedButtonInForm: false,
  showAddMoreButtonInForm: false,
  showResetFormButton: false,

  additionalRowActions: [
    {
      textInUi: 'Rate',
      executeThisFn: function (pScreenRow) {
        console.log(pScreenRow)
        const term = 'add reminders'
        console.log(this)
        this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
          searchTerm: term,
        })
      },
    },
  ],
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['description'],
  fnCreated: function (pRow) {
    // Goal: When it starts i need to initialize value with the initial slider value
    // At start this gets called with empty pRow so I return an empty array
    if (pRow.length < 1) {
      return []
    } else {
      return pRow[0]
    }
  },
  validationsObj: {
    value: {
      description: {
        minLength: minLength(8),
      },
      rating: {
        minLength: minLength(0),
      },
    },
  },
}
