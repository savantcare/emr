/* For docs read webclient/docs/models.md
To see response from server: http://127.0.0.1:8000/phone-numbers/getAll
*/
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class phoneNumbers extends clientSideTableManage {
  static entity = 'phoneNumbers'

  // To work with nodejs server -> mariaDB server
  static apiUrl = process.env.baseUrl + '/phone-numbers' // fetch baseurl from enviroment variable. Goal: change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"

  static fields() {
    return {
      ...super.fields(),

      id: this.uid(() => intUniqueID()), // if this is not set then update based on primary key will not work
      uuid: this.uid(() => uuidv1()),
      ptUUID: this.string(null),
      countryCode: this.string(''),
      phoneNumber: this.string(''),
      notes: this.string(null),
      priority: this.number(0),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
    }
  }
}
