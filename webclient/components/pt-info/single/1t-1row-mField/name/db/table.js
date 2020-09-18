// Reference implmentation for Ct that has 1 row and multiple fields.
// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class ptName extends clientSideTableManage {
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
      /*  How should time be stored in 1. mariadb 2. vuex-orm 3. JS
      
          Things given to us:
          A. There are 2 different types of timestamp?
            1. unix_timestamp / epoch_time -> Numbr of seconds since '1970-01-01 00:00:00'   epoch => start of unix
            2. JS timestamp -> JS expects timeStamp to be in millisecond format. # of milliseconds since '1970-01-01 00:00:00'
          
          B. 2147483647.999999 is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.

          C. MariaDB stores values that use the TIMESTAMP data type as unix_timestamp

          D. For datetime fields there are 2 precision values. DATETIME(6) for microseconds and DATETIME(3) for milliseconds

          Inferences:
          A. Cannot use timestamp as field type in mariaDB since it will not work after 2038

          B. Hence only option is to use datetime as the fieldtype in mariaDB. 
          
          C. Decided to use DATETIME(3) since JS has timestamp in milliseconds.
          Hence for MariaDB -> weight->timeOfMeasurement-> field type will be -> dateTime(3)
       
          D. internal data transfer is in the millisecond integer format. Why? 1. Integers are fast for comparison 2. String format has many different formats.

          E. data flow is: mariadb -> dateTime(3) -> select as milli-seconds -> node js -> milli-seconds -> vue -> vuex-orm  field type number -> element.io -> date component
              For e.g:
              1. /Users/vk-tech/gt/sc-prog-repos/emr/utils/db/json-server-mock-db.json  timeOfMeasurement is milliseconds from epoch 
              2. /emr/webclient/cts/pt-info/single/1t-1row-mField/bm/sub-cts/weight/vl/line-graph-ct.vue no need to multiply by 1000 to convert from seconds to milliseconds.
           
          F. In the datetime field the value is always in UTC. Hence timezone need not be stored.

          We want to do minimum # of conversions
          From unix timestamp to get the human readable format we can use: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC 
          */
    }
  }
}
