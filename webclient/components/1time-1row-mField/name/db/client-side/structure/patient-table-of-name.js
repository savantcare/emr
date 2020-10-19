// Reference implmentation for Ct that has 1 row and multiple fields.
// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js'
import nameForMasterClass from './master-table-of-name.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class nameForPatient extends clientSideTableManage {
  static entity = 'tblNamePatient' // this shows up in "vue dev console" -> vuex -> entities -> tblName

  /* By using process.env the code can support different locations for API server. Hence dev prod and test can use different API servers.
   baseurl is defined in nuxt.config.js
   static apiUrl = process.env.baseUrl + '/name'
   */

  static apiUrl = 'http://localhost:8000/public/api/name/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), //  Only on client side. Not on server side. if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      nameMasterId: this.uid(() => uuidv1()), // This is name ID coming from master table ./master-table-of-name.js
      nameFieldValue: this.string(null),

      /* Not stroing ptUuid inside viewstate since writing vuestate slows down the software. 
      Each browser tab will only work for 1 patient. So no need to store patientUuid inside vue state 
      ptUuid: this.string(null), */

      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000),

      // https://vuex-orm.org/guide/model/relationships.html#one-to-one-inverse
      tblNameMasterLink: this.belongsTo(nameForMasterClass, 'nameMasterId', 'nameMasterId'),
    }
  }
}
