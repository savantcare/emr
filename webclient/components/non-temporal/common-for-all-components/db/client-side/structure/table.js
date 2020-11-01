// import clientTblManage from '~/cts/def-processors/crud/row-manage.js'
import { Model } from '@vuex-orm/core'

let count = 0
const intUniqueId = () => ++count

export default class commonForAllComponents extends Model {
  static entity = 'tblCommonForAllComponents'

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

1. client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change Goal: Ignore message if server sends a socket message that originated from this client 
2. loggedInUserUuid. No need to store patientID since that comes from the URL
3. classification-of-component-to-show-on-left-hand-side   -> The values are health or other. See webclient/components/non-temporal/layer-1-left-side-header/toggle-health-other-component.vue
4. right-screen-extension-drawer-visibility         -> webclient/components/non-temporal/quick-access-to-features/index.vue
5. left-screen-extension-drawer-visibility          -> webclient/components/non-temporal/quick-access-to-features/index.vue
6. layer1-left-side-split-size                  -> webclient/components/non-temporal/quick-access-to-features/index.vue
7. layer1-right-side-split-size                 -> webclient/components/non-temporal/quick-access-to-features/index.vue


Need to search and find out if this is being used:
1. visibilityOfTopScreenExtension 

*/
