// import clientSideTableManage from '~/cts/non-temporal/crud/row-manage.js'
import { Model } from '@vuex-orm/core'

let count = 0
const intUniqueId = () => ++count

export default class commonForAllComponents extends Model {
  static entity = 'tblCommonForAllComponents'
  /* Ignore message if server sends a socket message that originated from this client */

  // static clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange = '' // this.$socket.id

  static primaryKey = 'fieldName' // primarykey is fieldname so that insertOrUpdate queries work

  static fields() {
    return {
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
