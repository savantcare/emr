// Reference implmentation for Ct ot 1 row and multiple fields.
// For docs read ptclient/docs/models.md
import rowManage from '~/cts/core/crud/row-manage.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class ptName extends rowManage {
  static entity = 'name'

  /* By using process.env the code can support different locations for API server. Hence dev prod and test can use different API servers.
   baseurl is defined in nuxt.config.js
   static apiUrl = process.env.baseUrl + '/name'
   */

  static apiUrl = 'http://localhost:3000/name'

  static fields() {
    return {
      ...super.fields(),

      id: this.uid(() => intUniqueID()), //  Only on client side. Not on server side. if this is not set then update based on primary key will not work
      uuid: this.uid(() => uuidv1()),

      /* Not stroing ptUUID inside viewstate since writing vuestate slows down the software. 
      Each browser tab will only work for 1 patient. So no need to store patientUUID inside vue state 
      ptUUID: this.string(null), */

      firstName: this.string(null),
      middleName: this.string(''),
      lastName: this.string(null),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),
      /* this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
       MariaDB stores values that use the TIMESTAMP data type as the number of seconds since '1970-01-01 00:00:00' (UTC).
       For fields like dateTimeOfMeasurement my plan is to store in the field type dateTime as a timestamp.
       
       To use this value inside JS I will need to multiply it be 1000 for e.g. see
       /emr/ptclient/cts/spi/1t-1rMf/weight/vl/line-graph.vue 
       
       How is time stored throughout the sytem?
        A. In mariadb We use datetime as the field type. Since field type timestamp is 4 bytes and cannot store beyond 2038
        B. In the field the value is always in UTC. Hence timezone need not be stored.
        C. Store the data as number of milliseconds since January 1, 1970, 00:00:00 UTC.

      We want to do minimum # of conversions

      From unix timestamp to get the human readable format we can use: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC */
    }
  }
}
