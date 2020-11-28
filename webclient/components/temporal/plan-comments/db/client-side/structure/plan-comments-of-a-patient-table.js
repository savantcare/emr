// For docs read webclient/docs/models.md
import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class plan_comments extends clientTblManage {
  static entity = 'tblPlanComments'

  /* 
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/plan-comments/getAll

    To make post request:
    enter http://127.0.0.1:8000/plan-comments/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/plan-comments'

  */

  static apiUrl = process.env.baseUrlForLumen + '/public/api/plan-comments/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      description: this.string(''),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const planCommentsFormDef = {
  id: 'plan_comments',
  plural: 'plan comments',
  singular: 'plan comment',
  fieldsDef: [{ nameInDb: 'description', nameInUi: 'Description', type: 'textarea' }],
  styleForEachRowInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 2fr 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryRowInsideADiv:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['description'],
  fnCreated: function () {
    // it is critical that emoty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  showReviewedButtonInForm: false,
  showAddMoreButtonInForm: false,
  showResetFormButton: false,

  // Ref: https://vuelidate.js.org/#sub-dynamic-validation-schema
  validationsObj: {
    value: {
      description: {
        minLength: minLength(8),
      },
    },
  },
}
