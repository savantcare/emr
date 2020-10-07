// import clientSideTableManage from '~/cts/others/crud/row-manage.js'
import { Model } from '@vuex-orm/core'

let count = 0
const intUniqueId = () => ++count

export default class commonForAllComponents extends Model {
  static entity = 'tblCommonForAllComponents'
  /* Ignore message if server sends a socket message that originated from this client */

  // static clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange = '' // this.$socket.id

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      clientSideUniqRowId: this.uid(() => intUniqueId()),
      fieldName: this.string(''),
      fieldValue: this.string(''),
    }
  }
}

/*
The fields that are stored as rows are:

1. clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange
2. loggedInUserUuid
3. classificationOfComponentToShowOnMultiTimeStateSide
4. visibilityOfLeftScreenExtension
5. visibilityOfRightScreenExtension
6. visibilityOfTopScreenExtension
*/
