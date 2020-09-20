// For docs read
// https://vuex-orm.org/guide/model/defining-models.html
// webclient/docs/models.md

import clientSideTableManage from "~/cts/core/crud/orm-row-manage.js";
export default class helloworld extends clientSideTableManage {
  static entity = "helloworldCh7";
  static primaryKey = "clientSideRowId";

  static fields() {
    return {
      ...super.fields(),
      id: this.uid(),
      msg: this.string(null),
    };
  }
}
