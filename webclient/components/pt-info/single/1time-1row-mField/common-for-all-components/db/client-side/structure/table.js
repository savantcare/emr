// import clientSideTableManage from '~/cts/core/crud/row-manage.js'
import { Model } from '@vuex-orm/core'

let count = 0
const intUniqueID = () => ++count

export default class commonForAllComponents extends Model {
  static entity = 'tblCommonForAllComponents'
  /* Ignore message if server sends a socket message that originated from this client */

  // static clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange = '' // this.$socket.id

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      clientSideUniqRowId: this.uid(() => intUniqueID()),

      clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange: this.string(
        ''
      ),

      loggedInUserUuid: this.string(null),
      // currentBrowserTabPatientUuid  is not stored here since it is better to get it always from URL

      classificationOfComponentToShowOnMultiTimeStateSide: this.string('health'),
    }
  }
}
