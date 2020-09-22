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
      fontSizeOfHeadingEveryWhereForNormalEyeSight: this.string('16px'),
      fontSizeOfContentEveryWhereForNormalEyeSight: this.string('14px'),
      fontSizeOfSubContentEveryWhereForNormalEyeSight: this.string('12px'),

      fontSizeOfHeadingEveryWhereForWeakEyeSight: this.string('18px'),
      fontSizeOfContentEveryWhereForWeakEyeSight: this.string('16px'),
      fontSizeOfSubContentEveryWhereForWeakEyeSight: this.string('14px'),

      currentUserEyeSight: this.string('normal'),
    }
  }
}
