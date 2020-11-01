// For docs read webclient/docs/models.md
import clientTblManage from '~/components/framework/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class recommendations extends clientTblManage {
  static entity = 'tblRecommendations'

  /* 
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/recommendations/getAll

    To make post request:
    enter http://127.0.0.1:8000/recommendations/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/recommendations'

  */

  static apiUrl = 'http://localhost:8000/public/api/recommendations/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      description: this.string(''),
      notes: this.string(null),
      priority: this.number(0),
      isAutoRem: this.number(0),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
    }
  }
}

export const recommendationsFormDef = {
  id: 'recommendations',
  plural: 'recommendations',
  singular: 'recommendation',
  fieldsDef: [
    {
      fieldNameInDb: 'description',
      fieldNameInUi: 'Description',
      fieldType: 'textarea',
      span: 24,
      required: true,
      minLength: 5,
    },
  ],
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['description'],
  showFormReviewedButton: false,
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  styleForEachRow: 'padding: 0px; margin: 0px; display: grid; grid-template-columns: 2fr 1fr; grid-column-gap: 1rem',
}
