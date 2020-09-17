// import rowManage from '~/cts/core/crud/row-manage.js'
import { Model } from '@vuex-orm/core'

let count = 0
const intUniqueID = () => ++count

export default class commonForAllComponents extends Model {
  static entity = 'common'
  /* Ignore message if server sends a socket message that originated from this client */

  // static clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange = '' // this.$socket.id

  static fields() {
    return {
      id: this.uid(() => intUniqueID()),
      clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange: this.string(
        ''
      ),
    }
  }
}
