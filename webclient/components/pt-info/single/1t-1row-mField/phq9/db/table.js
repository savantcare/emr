// For docs read ptclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class ptPhq9 extends clientSideTableManage {
  static entity = 'phq9'

  // static apiUrl = 'http://localhost:3000/phq9' // for json-server data
  static apiUrl = 'http://localhost:8000/public/api/phq9/v20/'

  static graphSeries1Unit = 'unit'

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

      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),
    }
  }
}
