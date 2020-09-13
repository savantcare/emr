import rowManage from '~/cts/core/crud/row-manage.js'

export default class commonForAllComponents extends rowManage {
  static entity = 'common'
  /* Ignore message if server sends a socket message that originated from this client */

  static clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange = '' // this.$socket.id
}
