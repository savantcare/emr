// Reference implmentation for Ct that has 1 row and multiple fields.
// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class ptName extends clientTblManage {
  static entity = 'tblName' // this shows up in "vue dev console" -> vuex -> entities -> tblName

  /* By using process.env the code can support different locations for API server. Hence dev prod and test can use different API servers.
   baseurl is defined in nuxt.config.js
   static apiUrl = process.env.baseUrl + '/name'
   */

  static apiUrl = process.env.baseUrlForLumen + '/public/api/user/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), //  Only on client side. Not on server side. if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      /* Not stroing ptUuid inside viewstate since writing vuestate slows down the software. 
      Each browser tab will only work for 1 patient. So no need to store patientUuid inside vue state 
      ptUuid: this.string(null), */

      firstName: this.string(null),
      middleName: this.string(null).nullable(),
      lastName: this.string(null).nullable(),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000),
    }
  }
}

export const nameFormDef = {
  id: 'name',
  plural: 'names',
  singular: 'name',
  fieldsDef: [
    { nameInDb: 'firstName', nameInUi: 'First name', type: 'text' },
    { nameInDb: 'middleName', nameInUi: 'Middle name', type: 'text' },
    { nameInDb: 'lastName', nameInUi: 'Last name', type: 'text' },
  ],
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['firstName'],
  fnCreated: function () {},

  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 3fr 3fr 3fr; grid-column-gap: 1rem',
}
