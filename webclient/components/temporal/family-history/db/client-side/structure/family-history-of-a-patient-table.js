// For docs read webclient/docs/models.md
import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class family_history extends clientTblManage {
  static entity = 'tblFamilyHistory'

  /* 
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/family-history/getAll

    To make post request:
    enter http://127.0.0.1:8000/family-history/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/family-history'

  */

  static apiUrl = 'http://localhost:8000/public/api/family-history/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      description: this.string(''),
      relationship: this.string(''),
      priority: this.number(0),
      isAutoRem: this.number(0),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliseconds is used.
    }
  }
}

export const familyHistoryFormDef = {
  id: 'family_history',
  plural: 'family history',
  singular: 'family history',
  fieldsDef: [
    { fieldNameInDb: 'relationship', fieldNameInUi: 'Relationship', fieldType: 'text', span: 24 },
    { fieldNameInDb: 'description', fieldNameInUi: 'Description', fieldType: 'textarea', span: 24 },
  ],
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['relationship'],
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  showFormReviewedButton: false,
  styleForEachRow:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 3fr 3fr 1fr; grid-column-gap: 1rem',
  validationsObj: {
    value: {
      description: {
        minLength: minLength(8),
      },
      relationship: {
        minLength: minLength(8),
      },
    },
  },
}
