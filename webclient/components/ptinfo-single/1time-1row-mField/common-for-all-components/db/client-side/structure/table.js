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
      fieldName: this.string(''),
      fieldValue: this.string(''),
    }
  }
}

/*
The fields that are stored as rows are:

clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange
loggedInUserUuid
classificationOfComponentToShowOnMultiTimeStateSide
*/
