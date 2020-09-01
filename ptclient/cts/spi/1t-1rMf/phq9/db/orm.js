// For docs read ptclient/docs/models.md
import rowManage from '~/cts/core/crud/row-manage.js'
import { SCREENING_API_URL } from '@/static/others.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class ptPhq9 extends rowManage {
  static entity = 'phq9'

  static apiUrl = `${SCREENING_API_URL}` //  for mariadb data via node server
  // static apiUrl = 'http://localhost:3000/phq9' // for json-server data

  static graphSeries1Unit = 'unit'

  // By using process.env the code can support different locations for API server. Hence dev prod and test can use different API servers.
  // baseurl is defined in nuxt.config.js
  // static apiUrl = process.env.baseUrl + '/name'

  static fields() {
    return {
      ...super.fields(),

      id: this.uid(() => intUniqueID()), // if this is not set then update based on primary key will not work
      uuid: this.uid(() => uuidv1()),

      littleInterestOrPleasureInDoingThings: this.string(null),
      feelingDownDepressedOrHopeless: this.string(null),
      troubleFallingOrStayingAsleep: this.string(null),
      feelingTiredOrHavingLittleEnergy: this.string(null),
      poorAppetiteOrOvereating: this.string(null),
      feelingBadAboutYourself: this.string(null),
      troubleConcentratingOnThings: this.string(null),
      movingOrSpeakingSoSlowly: this.string(null),
      thoughtsThatYouWouldBeBetterOffDead: this.string(null),
      ifYouCheckedOffAnyProblems: this.string(null),

      // timeOfMeasurement: this.number(null),
      // notes: this.string(null),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
    }
  }
}
