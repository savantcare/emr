// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

// const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class serviceStatementsMasterList extends clientSideTableManage {
  static entity = 'tblServiceStatementMaster'

  static apiUrl = 'http://localhost:8000/public/api/service-statements/v20'

  static fields() {
    return {
      ...super.fields(),

      id: this.uid(() => intUniqueID()), // if this is not set then update based on primary key will not work
      description: this.string(null),
    }
  }
}
